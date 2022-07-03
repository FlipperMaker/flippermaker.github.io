/*

https://web.dev/serial/

*/
let serial = new GenericSerial();
serial.connect_callback = connect_callback;
serial.disconnect_callback = disconnect_callback;
serial.send_callback = send_callback;
serial.receive_callback = receive_callback;
let connected = false;
let path = "/";
const type_enum = Object.freeze({
	dir: 1,
	file: 2,
	error: 3
});
let files = [];
const mode_enum = Object.freeze({
	load: 1,
	view: 2,
	delete: 3
});
let mode = mode_enum.load;
let progress = -1;
const CLI_PROMPT = ">: ";
const CLI_EOL = "\r\n";

function connect_callback() {
	connected = true;
	path = "/";
	serial.send("device_info\r").then(() => {
		serial.read_until("hardware_model").then(() => {
			serial.read_until(CLI_PROMPT).then(() => {
				get_filelist();
				connected = true;
			});
		});
	});
}

function disconnect_callback() {
	connected = false;
}

function decode(data) {
	return new TextDecoder().decode(data);
}

function send_callback(data) {}

function receive_callback(data) {
	terminal.add_line(decode(data));
}
async function get_filelist() {
	await serial.send('storage list "' + path + '"\r');
	await serial.read_until(CLI_EOL);
	serial.read_until(CLI_PROMPT).then((data) => {
		let lines = [];
		let start = 0;
		let stop = 0;
		for (let i = 0; i < data.length; i++) {
			// TODO fix overflow
			if (data[i] == 13 && data[i + 1] == 10) {
				stop = i;
				lines.push(data.slice(start, stop));
				start = i + 2;
			}
		}
		files = [];
		lines.forEach(function(item) {
			let text = "";
			try {
				text = decode(item);
			} catch (error) {}
			text = text.trim();
			if (text.length > 0) {
				if (text == "Empty") {
					// nothing
				} else {
					text = text.split(" ");
					let type = type_enum.error;
					let size = 0;
					let name = "";
					if (text[0] == "[D]") {
						type = type_enum.dir;
						text.shift();
						name = text.join(" ");
						files.push({
							type: type,
							name: name,
							size: size
						});
					} else if (text[0] == "[F]") {
						type = type_enum.file;
						size = parseInt(text.at(-1).replace("b", ""));
						text.pop();
						text.shift();
						name = text.join(" ");
						files.push({
							type: type,
							name: name,
							size: size
						});
					} else {
						name = text.join(" ");
						files.push({
							type: type,
							name: name,
							size: size
						});
					}
				}
			}
		});
		files.sort(function(a, b) {
			if (a.type == type_enum.dir && b.type == type_enum.dir) {
				if (a.name > b.name) {
					return 1;
				}
				if (a.name < b.name) {
					return -1;
				}
				return 0;
			} else if (a.type == type_enum.file && b.type == type_enum.file) {
				if (a.name > b.name) {
					return 1;
				}
				if (a.name < b.name) {
					return -1;
				}
				return 0;
			} else {
				if (a.type == type_enum.dir) {
					return -1;
				} else {
					return 1;
				}
			}
		});
	});
}
async function connect() {
	await serial.try_to_connect();
}
async function update_path(name) {
	path += "/" + name;
	path = path.replace("//", "/");
	get_filelist();
}
async function update_path_up() {
	path = path.substring(0, path.lastIndexOf("/"));
	path = path.replace("//", "/");
	if (path.length == 0) path = "/";
	get_filelist();
}
async function download(name) {
	let filepath = path + "/" + name;
	const buffer_size = 512;
	progress = 0;
	await serial.send('storage read_chunks "' + filepath + '" ' + buffer_size + "\r");
	await serial.read_until(CLI_EOL);
	await serial.read_until(CLI_EOL).then(async (data) => {
		data = decode(data);
		let size = parseInt(data.split(": ")[1]);
		var file_data = new Uint8Array(size);
		let readed_size = 0;
		while (readed_size < size) {
			await serial.read_until("Ready?" + CLI_EOL);
			await serial.send("y");
			let read_size = Math.min(size - readed_size, buffer_size);
			await serial.read_count(read_size).then((buffer) => {
				for (let i = 0; i < buffer.length; i++, readed_size++) {
					file_data[readed_size] = buffer[i];
				}
			});
			progress = Math.floor((readed_size / size) * 100);
		}
		if (mode == mode_enum.load) {
			var file_blob = new Blob([file_data], {
				type: "application/octet-stream",
			});
			saveAs(file_blob, name);
		} else if (mode == mode_enum.view) {
			console.log(decode(file_data));
		}
		await serial.read_until(CLI_PROMPT);
		get_filelist();
		progress = -1;
	});
}
async function may_be_connected() {
	await serial.on_connect();
}
may_be_connected();
async function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files; // FileList object.
	var reader = new FileReader();
	//for (var i = 0, f; (f = files[i]); i++) {
	// TODO multiload
	let f = files[0];
	let name = f.name;
	let size = f.size;
	reader.readAsArrayBuffer(f);
	reader.onload = async () => {
		let data = new Uint8Array(reader.result);
		console.log(name, size, data);
		progress = 0;
		await serial.send('storage remove "' + path + "/" + name + '"\r');
		await serial.read_until(CLI_EOL);
		await serial.read_until(CLI_PROMPT);
		const fpath = path + "/" + name;
		const buffer_size = 512;
		let sended_size = 0;
		while (sended_size < data.length) {
			let send_size = Math.min(data.length - sended_size, buffer_size);
			let buffer = data.slice(sended_size, sended_size + send_size);
			sended_size += send_size;
			console.log("Sending ", sended_size, buffer, " to ", fpath);
			//terminal.add_line("[" + decode(buffer) + "]");
			await serial.send('storage write_chunk "' + fpath + '" ' + buffer.length + "\r");
			await serial.read_until(CLI_EOL);
			await serial.read_until(CLI_EOL);
			await serial.send_raw(buffer);
			await serial.read_until(CLI_PROMPT);
			progress = Math.floor((sended_size / size) * 100);
		}
		get_filelist();
		progress = -1;
	};
	//}
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
}

function switch_mode(new_mode) {
	mode = new_mode;
}