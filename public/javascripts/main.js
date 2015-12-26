'use strict';

var Validate = function (fields) {
    this.fields = fields;
    this.errors = [];
};

Validate.prototype.isNotEmpty = function (field) {
    if (  $(field).val() !== '' )  {
        return true;
    } else {
        return false;
    }
};

Validate.prototype.isCheckedRadio = function(field) {
    if ($(field).data('group-checkbox') === true) {
        if ($(field).find('input:checked').length === 0 ){
            return false;
        } else {
            return true;
        }
    }else{
        return false;
    }
};

Validate.prototype.pushError = function (field) {
    this.errors.push(field);
};

Validate.prototype.hook = function (valid, field) {
    this.setValidClass(valid, field);
    if (!valid) {
        this.pushError(field);
    } else {
        return;
    }
};

Validate.prototype.setValidClass = function (valid, field) {
    if (valid) {
        this.success(field);
    } else {
        this.error(field);
    }
};

Validate.prototype.error = function (field) {
    $(field).removeClass('input-success');
    $(field).addClass('input-error');
};

Validate.prototype.success = function (field) {
    $(field).removeClass('input-error');
    $(field).addClass('input-success');
};

Validate.prototype.isValid = function (fields) {
    this.fields = fields;
    this.errors = [];
    for (var i = 0, l = this.fields.length; i < l; i++) {
        if ( this.isNotEmpty(this.fields[i]) || this.isCheckedRadio(this.fields[i]) ){

            this.hook(true, this.fields[i]);

        } else {
            this.hook(false, this.fields[i]);
        }
    }

    if (this.errors.length <= 0) {
        return true;
    } else {
        return false;
    }
};

Validate = new Validate();

var socket = io.connect('http://localhost:4000');

var Main = function () {
    this.init();

};

Main.prototype.init = function () {
    this.checkType = null;
    this.fiels = null;
    this.hook = null;
    this.modal = $('.modal');
    this.submitButton = $('#submit-button');
    this.fileData = $('#file-data');
    this.btFromFile = $('#bt-from-file');
    this.btFromUrl = $('#bt-from-url');
    this.mainContent = $('#main-content');
    this.optionsButton = $('.options-button');
    this.steps = $('.step');
    this.totalSteps = this.steps.length;
    this.currentItem = 0;
    this.btNext = $('.next');
    this.btPrevious = $('.previous');
    this.btAdd = $('.button-add');
    this.btSave = $('.save-destiny');
    this.containerSave = $('.navigation-button');
    this.form = $('#form');
    this.row = $('.w-row');
    this.addEventListeners();
};

Main.prototype.addEventListeners = function () {
    this.optionsButton.click($.proxy(this.chooseType));
    this.submitButton.click($.proxy(this.go, this));
    this.btNext.click($.proxy(this.next, this));
    this.btPrevious.click($.proxy(this.previous, this));
    this.row.on('click', '.button-add', $.proxy(this.addRow, this));
    this.btSave.click($.proxy(this.go, this));
};


Main.prototype.change = function () {
    if (this.currentItem === 0) {
        this.firstStep();
    }else if (this.currentItem === 1) {
        this.secondStep();
    }else if (this.currentItem === 2) {
        this.thirdStep();
    }
};

Main.prototype.firstStep = function () {
    this.containerSave.hide();
    this.btPrevious.hide();
    this.btNext.show();
    this.goToStep();
};

Main.prototype.secondStep = function () {
    this.containerSave.hide();
    this.btPrevious.show();
    this.btNext.show();
    this.goToStep();
};

Main.prototype.thirdStep = function () {
    this.containerSave.show();
    this.btPrevious.show();
    this.btNext.hide();
    this.goToStep();
};

Main.prototype.goToStep = function() {
    $(this.steps).hide();
    $(this.steps[this.currentItem]).show();
};

Main.prototype.chooseType = function (e) {
    var target = $(e.currentTarget);
    var optionSelected = target.find('input').val();
    target.closest('fieldset').find('.opt-active').removeClass('opt-active');
    target.closest('fieldset').find('.type').hide();
    $('.'+optionSelected).show();
    target.addClass('opt-active');
};

Main.prototype.addRow = function (e) {
    e.preventDefault();
    var target = $(e.currentTarget);
    var container = target.closest('.w-row');
    var parent = target.closest('.row');
    var cloned = $(parent).clone();
    cloned.find('input').val('');
    cloned.appendTo(container);
};

Main.prototype.formatSize = function (container) {
    var l = container.length;
    var array = [];
    var listContainer = [];
    for(var i=0; i<l; i++){
        array = [];
        array.width = $(container[i]).find('.choose-width').val();
        array.height = $(container[i]).find('.choose-height').val();
        listContainer.push(array);
    }
    return listContainer;
};

Main.prototype.go = function (e) {
    e.preventDefault();
    var objForm =  {};
    this.modal.show();
    objForm.destiny = $(e.currentTarget).val();
    objForm.from = $('.from:checked').val();
    objForm.size = $('.choose-size:checked').val();
    objForm.customSize = this.formatSize($('.row-size'));
    objForm.extension = $('.choose-extension:checked').val();
    objForm.fileName = $('.file-name').val();
    objForm.file = $('.file').val();
    objForm.url = $('.url').val();
    objForm.origin = this.getOrigin(objForm);
    this.sentData(objForm);
};

Main.prototype.sentData = function (obj) {
    console.log(obj);
    socket.emit('add-message', obj);
};



Main.prototype.getOrigin = function (objForm) {
    var origin = '';
    if (objForm.from === 'from-file'){
        origin = objForm.file;
    } else {
        origin = objForm.url;
    }
    return origin;
};

Main.prototype.next = function () {
    var fields = $(this.steps[this.currentItem]).find('.required:visible');
    if (Validate.isValid(fields)){
        this.currentItem++;
        this.change();
    }
};



Main.prototype.isNotEmpty = function (field) {
    if (  $(field).val() !== '' &&  $(field).val() !== $(field).attr('placeholder')  )  {
        return true;
    } else {
        return false;
    }

};

Main.prototype.previous = function () {
    this.currentItem--;
    this.change();
};

Main.prototype.forceZipDownload = function (dir) {
    //window.location.href = '/' + dir + '.zip';
};

var main = new Main();

socket.on('message-added', function (data) {
    console.log(data);
    main.modal.hide();
    var items = data.obj.imgObj[0];
    var dir = parseInt(data.obj.folder);
    console.log(dir);
    if (items) {
        var img = '';
        for (var i = 0; i < items.length; i++) {
            img += '<picture class="preview-container">';
            img += '<img class="preview-image" src='+dir+'/'+items[i].filename+' />';
            img += '<figcaption class="preview-caption">';
            img += '<div class="w-row">';
            img += '<div class="w-col w-col-8 w-clearfix"><h4>'+items[i].filename+'</h4></div>';
            img += '<div class="w-col w-col-4 w-clearfix"><h5>'+items[i].filename+'</h5></div>';
            img += '</div>';
            img += '</figcaption>';
            img += '</picture>';
        }
        $('.sidebar').append(img);
    }
    main.forceZipDownload(dir);
});
