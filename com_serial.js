/*

https://web.dev/serial/

*/

class GenericSerial {
	constructor() {
		this.filter_flipper = {
			usbVendorId: 1155,
			usbProductId: 22336
		};
		this.port = null;
		this.connect_callback = null;
		this.disconnect_callback = null;
		this.reader = null;
		this.writer = null;
		this.read_buffer = new Uint8Array(0);
		this.send_callback = null;
		this.receive_callback = null;
		if (this.is_supported()) {
			let self = this;
			navigator.serial.onconnect = () => {
				self.on_connect();
			};
			navigator.serial.ondisconnect = () => {
				self.on_disconnect();
			};
		}
	}
	is_supported() {
		return "serial" in navigator;
	}
	async try_to_connect() {
		if (this.is_supported()) {
			let self = this;
			await this.request_port().then(async (port) => {
				if (port.length != 0) {
					self.port = port;
					self.port.onconnect = () => {
						self.on_connect();
					};
					await self.connect();
					if (this.connect_callback != null) {
						this.connect_callback();
					}
				}
			});
		}
	}
	async connect() {
		await this.port.open({
			baudRate: 115200
		});
		this.reader = this.port.readable.getReader();
		this.writer = this.port.writable.getWriter();
	}
	async disconnect() {
		if (this.reader) {
			this.reader.cancel().then(() => {
				if (this.port) {
					this.port.close();
				}
			});
		}
	}
	async get_port() {
		return await navigator.serial.getPorts({
			filters: [this.filter_flipper]
		});
	}
	async request_port() {
		return await navigator.serial.requestPort({
			filters: [this.filter_flipper],
		});
	}
	async on_connect() {
		console.log("Serial connected");
		await this.get_port().then(async (ports) => {
			if (ports !== null && Array.isArray(ports) && ports.length > 0) {
				this.port = ports[0];
				await this.connect();
				if (this.connect_callback != null) {
					this.connect_callback();
				}
			}
		});
	}
	on_disconnect() {
		console.log("Serial disconnected");
		this.disconnect().then(() => {
			this.port = null;
			if (this.disconnect_callback != null) {
				this.disconnect_callback();
			}
		});
	}
	async send(data) {
		let encoded_data = new TextEncoder().encode(data);
		await this.send_raw(encoded_data);
	}
	async send_raw(data) {
		if (this.send_callback != null) {
			await this.send_callback(data);
		}
		await this.writer.write(data);
	}
	concatTypedArrays(a, b) {
		var c = new a.constructor(a.length + b.length);
		c.set(a, 0);
		c.set(b, a.length);
		return c;
	}
	async read_count(count) {
		let data = new Uint8Array(count);
		let finished = false;
		let current_count = 0;
		while (!finished) {
			try {
				while (!finished) {
					const {
						value,
						done
					} = await this.reader.read();
					if (done) {
						break;
					}
					if (this.receive_callback != null) {
						await this.receive_callback(value);
					}
					this.read_buffer = this.concatTypedArrays(this.read_buffer, value);
					for (let i = 0; i < value.length; i++, current_count++) {
						data[current_count] = value[i];
						if (current_count >= count) {
							finished = true;
							break;
						}
					}
				}
			} catch (error) {
				console.error(error);
				finished = true;
			}
		}
		return data;
	}
	async read_until(eol = "\n", cut_eol = true) {
		let finished = false;
		let data = new Uint8Array(0);
		let encoded_eol = new TextEncoder().encode(eol);
		while (!finished) {
			try {
				while (true) {
					let i = this.read_buffer.findIndex((el, ind, arr) => {
						let result = true;
						for (let ei = 0; ei < encoded_eol.length; ei++) {
							// TODO fix overflow
							if (encoded_eol[ei] != arr[ind + ei]) {
								result = false;
								break;
							}
						}
						return result;
					});
					if (i >= 0) {
						finished = true;
						//console.log(this.read_buffer);
						if (!cut_eol) {
							data = this.read_buffer.subarray(0, i + encoded_eol.length);
						} else {
							data = this.read_buffer.subarray(0, i);
						}
						this.read_buffer = this.read_buffer.subarray(i + encoded_eol.length);
						//console.log(this.read_buffer);
						break;
					}
					const {
						value,
						done
					} = await this.reader.read();
					if (done) {
						break;
					}
					if (this.receive_callback != null) {
						await this.receive_callback(value);
					}
					this.read_buffer = this.concatTypedArrays(this.read_buffer, value);
				}
			} catch (error) {
				console.error(error);
				finished = true;
			}
		}
		return data;
	}
}