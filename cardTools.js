
cardCollapseEnabled = () => true;

function showHideCard(btn, cardID) {
    if (!cardCollapseEnabled()) return;
    if (typeof btn === 'string' || btn instanceof String) btn = document.getElementById(btn);
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        $(cardID).collapse("toggle");
        $(cardID).on('shown.bs.collapse hidden.bs.collapse', (event) => updateMasonryLayout());
    });
}
function showHideCardShow(cardID) {
    if (!cardCollapseEnabled()) return;
    $(cardID).collapse("show");
    $(cardID).on('shown.bs.collapse hidden.bs.collapse', (event) => updateMasonryLayout());
}
function genCardHeadCode(cardTitle, cardSpanName) {
    var a = `<div class="card-header text-center">`;
    var aa = `<div class="card-header">`;
    var l = `<div class="ms-auto d-inline-block">`;
    var ll = `<div class="text-start d-inline-block">`;
    var lll = `<div class="float-start d-inline-block">`;
    var r = `<div class="me-auto d-inline-block">`;
    var rr = `<div class="text-end d-inline-block">`;
    var rrr = `<div class="float-end d-inline-block">`;
    var d = `</div>`;
    var b = `<h5 class="card-title d-inline-block">${cardTitle}</h5>`;
    if (!cardCollapseEnabled()) return a + b + d;
    var c = `<button id="${cardSpanName}BodyCollapse" type="button" class="btn btn-primary btn-sm d-inline-block">Show/Hide</button>`;
    return aa + lll + b + d + rrr + c + d + d;
}

// function submit_event(formID, callbackFn) {
//     let form_object = document.getElementById(formID);
//     form_object.addEventListener("submit", (event) => {
//         event.preventDefault();
//         callbackFn();
//         //callbackFn(event);
//     });
// }


function updateMasonryLayout() {
    var msnry = new Masonry('.row', { percentPosition: true });
    msnry.layout();
}
class CardTools_Form_Select {
    constructor(fieldName, formID) {
        this.fieldID = `${fieldName}_Form_${formID}`;
        this.selectOptions = [];
    }
    addOption(optValue, optText, selected = false) {
        this.selectOptions.push(`<option value="${optValue}" ${selected ? 'selected' : ''}>${optText}</option>`);
    }
    getFormSelectCode() {
        let code = `<select id="${this.fieldID}" class="form-select" aria-label="Default select">${this.selectOptions.join('\n')}</select>`;
        return code;
    }
}

class CardTools_Form_Button {
    constructor(fieldName, formID, btnText, colorScheme = 'btn-primary', size = 'btn-sm') {
        this.buttonID = `${fieldName}_Form_${formID}`;
        this.fieldName = fieldName;
        this.formID = formID;
        this.btnText = btnText;
        this.colorScheme = colorScheme;
        this.size = size;
    }
    getID() {
        return this.buttonID;
    }
    getButton() {
        return `<button id="${this.buttonID}" type="button" class="btn ${this.colorScheme} ${this.size}">${btnText}</button>`;
    }

}


class CardTools_Form {
    constructor(formID) {
        this.formID = formID.slice(0, 8).toLowerCase() == 'generate' ? formID : 'generate' + formID;
        this.formBody = [];
        this.elements = [];

    }
    
    createFormElement(label, fieldName, fieldCode, helpMessage = null) {
        let helpMessageCode = (helpMessage == null || helpMessage.trim() == '') ? '' : `<div id="${fieldName}Help${this.formID}" class="form-text">${helpMessage}</div>`;
        return `<div class="mb-3">${'\n'}<label for="${fieldName}Form${this.formID}" class="form-label">${label}</label>${'\n'}${fieldCode}${'\n'}${helpMessageCode}${'\n'}</div>`;

    }
    addButton(fieldName, btnText, colorScheme = 'btn-primary', size = 'btn-sm') {
        let objButton = new CardTools_Form_Button(fieldName, this.formID, btnText, colorScheme, size);
        let codeButton = objButton.getButton();
        let code = `<div class="d-grid gap-2 d-md-flex justify-content-md-end">${codeButton}</div>`;
        this.formBody.push(code);
        this.elements.push(objButton.getID());
        return objButton.getID();
    }
    addButtons(btnObjects = []) {
        btnCode = [];
        btns.forEach(btn => {
            btnCode.push(btn.getButton());
            this.elements.push(btn.getID());
        });
        let code = `<div class="d-grid gap-2 d-md-flex justify-content-md-end">${btnCode.join('')}</div>`;
        this.formBody.push(code);
    }
    addFieldSelect(label, fieldName, helpMessage = '', selectOptions = {}, selectDefaultKey = '') {
        let id = `${fieldName}_Form_${this.formID}`;
        selectDefaultKey = selectDefaultKey == null ? '' : selectDefaultKey;
        let selectCode = new CardTools_Form_Select(fieldName, this.formID);
        Object.keys(selectOptions).forEach(function (key) {
            selectCode.addOption(key, dictionary[key], key.toLowerCase() == selectDefaultKey.toLowerCase());
        });
        let code = selectCode.getFormSelectCode();
        code = this.createFormElement(label, fieldName, code, helpMessage);
        this.formBody.push(code);
        this.elements.push(id);
        return id;
    }
    addFieldText(label, fieldName, inputType = 'text', helpMessage = '', placeHolder = null) {
        let id = `${fieldName}_Form_${this.formID}`;
        let placeHolderCode = (placeHolder == null || placeHolder.trim() == '') ? '' : `placeholder="${placeHolder}"`;
        let code = `<input type="${inputType}" class="form-control" id="${id}" ${placeHolderCode}>`;
        code = this.createFormElement(label, fieldName, code, helpMessage);
        this.formBody.push(code);
        this.elements.push(id);
        return id;
    }
    addFieldTextArea(label, fieldName, helpMessage = '', placeHolder = null, rows = 5) { // ${}
        let id = `${fieldName}_Form_${this.formID}`;
        let placeHolderCode = (placeHolder == null || placeHolder.trim() == '') ? '' : `placeholder="${placeHolder}"`;
        let code = `<textarea class="form-control" id="${id}" rows="${rows}" ${placeHolderCode}></textarea>`;
        code = this.createFormElement(label, fieldName, code, helpMessage);
        this.formBody.push(code);
        this.elements.push(id);
        return id;
    }
    addButtonResetForm(fieldName, btnText = 'Reset', classValue = 'btn btn-primary') {
        let id = `${fieldName}_ResetForm_${this.formID}`;
        let code = `<button id="${id}" type="reset" class="${classValue}">${btnText}</button>`;
        this.formBody.push(code);
        this.elements.push(id);
        return id;
    }
    addButtonSubmitForm(fieldName, btnText = 'Generate', classValue = 'btn btn-primary') {
        let id = `${fieldName}_SubmitForm_${this.formID}`;
        let code = `<button id="${id}" type="submit" class="${classValue}">${btnText}</button>`;
        this.formBody.push(code);
        this.elements.push(id);
        return id;
    }
    addButtonsResetSubmit_Generic(submitBtnText = "Generate", resetBtnText = "Reset",
        submitClassValue = 'btn btn-primary', resetClassValue = 'btn btn-primary') {
        let submitBtnID = this.addButtonSubmitForm("Generic", submitBtnText, submitClassValue);
        let resetBtnID = this.addButtonResetForm("Generic", resetBtnText, resetClassValue);
        return submitBtnID;
    }
    getFormCode() {
        return `<form id="${this.formID}">${'\n'}${this.formBody.join('\n')}${'\n'}</form>`;
    }
}

class CardTools_Card {
    constructor(cardSpanName, cardTitle = null, collapsed = true) {
        this.cardSpanName = cardSpanName.slice(0, 4).toLowerCase() == 'card' ? cardSpanName : 'card' + cardSpanName;
        this.cardTitle = cardTitle == null ? '' : cardTitle;
        this.cardCollapseBodyClassCode = cardCollapseEnabled() ? (collapsed ? "collapse" : "collapse show") : "";
        this.cardCollapseBodyIdCode = this.cardSpanName + 'Body';
        this.cardCollapseHeadCode = this.genCardHeadCode(this.cardTitle, this.cardSpanName);
        this.cardBody = [];
    }

    addBodyText(textTag = 'p', text) {
        let code = `<${textTag}>${text}</${textTag}>`;
        this.cardBody.push(code);
    }
    addFormCode(formObject) {
        this.cardBody.push(formObject.getFormCode());
    }
    getCardCode(replaceTabs = false, replaceEmptyLines = false) {
        this.cardCode = `<div class="card mb-3">${'\n'}${this.cardCollapseHeadCode}${'\n'}`
            + `<div class="card-body ${this.cardCollapseBodyClassCode}" id="${this.cardCollapseBodyIdCode}">${'\n'}`
            + `${this.cardBody.join('\n')}${'\n'}</div>${'\n'}</div>`;

        let ret = replaceTabs ? this.cardCode.replaceAll('\t', '') : this.cardCode;
        if (replaceEmptyLines) {
            while (ret.includes('\n\n')) {
                ret = ret.replaceAll('\n\n', '\n');
            }
        }
        return ret;
    }
    genCardHeadCode(cardTitle, cardSpanName) {
        var a = `<div class="card-header text-center">`;
        var aa = `<div class="card-header">`;
        var lll = `<div class="float-start d-inline-block">`;
        var rrr = `<div class="float-end d-inline-block">`;
        var d = `</div>`;
        var b = `<h5 class="card-title d-inline-block">${cardTitle}</h5>`;
        if (!cardCollapseEnabled()) return a + b + d;
        var c = `<button id="${cardSpanName}BodyCollapse" type="button" class="btn btn-primary btn-sm d-inline-block">Show/Hide</button>`;
        let ret = [aa, lll, b, d, rrr, c, d, d];
        return ret.join('\n');
        //return aa + lll + b + d + rrr + c + d + d;
    }


}