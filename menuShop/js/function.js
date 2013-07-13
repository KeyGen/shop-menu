//Menu shop - краткое описание на английском
//Copyright (C) 2012  <developer.webasyst@yandex.ua>
//
//    This program is free software; you can redistribute it and/or
//modify it under the terms of the GNU General Public License
//as published by the Free Software Foundation; either version 2
//of the License, or (at your option) any later version.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program; if not, write to the Free Software
//Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//MA 02110-1301, USA.

var cp;

tabs_menu_editor(document).ready(function(){

    tabs_menu_editor( '#tabs-menu-editor' ).tabs({
        fx: {
            opacity:'toggle',
            duration:'fast'
        }
    }).find( ".ui-tabs-nav" ).sortable({ axis: "x",
            start: function(event, ui) { position = ui.item.index(); },
            stop: function(event, ui)  { editPositionAjax(position, ui.item.index(), 0); position = -1; }
        });

    tabs_menu_editor( "#tabs-dialog-help" ).tabs();
    tabs_menu_editor( "#tabs-dialog-setting" ).tabs();

    tabs_menu_editor('.editSuperMenu').click(function(){
        var id = this.id.replace('editSuperMenu_','');
        var name = tabs_menu_editor(this).parent().text();
        editMenu(id);
    });

    tabs_menu_editor('.editSuperMenu').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    tabs_menu_editor('.removeBanner').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    tabs_menu_editor('.removeBanner').click(function(){
        var remove_id = this.id.replace('remove_banner_','');
        removeBannerAjax(remove_id);
    });

    tabs_menu_editor('.addBlock').click(function(){
        var tabs = tabs_menu_editor('#tabs-menu-editor');
        var index = tabs.tabs('length');
        addBlockAjax(0, index, 0);
    });

    tabs_menu_editor('.addBlock').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    tabs_menu_editor('.addBlockTwo').click(function(){
        var id = tabs_menu_editor(this).attr('id').replace('add_block_two_','');
        var accordion = tabs_menu_editor('#menuSuper_'+id+' .ui-accordion');
        var index = accordion.length;
        addBlockAjax(id, index, 1);
    });

    tabs_menu_editor('.addBlockThree').click(function(){
        var id = tabs_menu_editor(this).attr('id').replace('add_block_three_','');
        var accordion = tabs_menu_editor(this).parent().parent().find('li');
        var index = accordion.length;
        addBlockAjax(id, index, 2);
    });

    tabs_menu_editor('.addBlockThree').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    tabs_menu_editor('.addBlockTwo').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    tabs_menu_editor('.settingMenu').click(function(){

        colorSetEditor('color-setting', color_default);

        tabs_menu_editor("#dialog-setting").dialog({
            modal:true,
            title: 'Глобальные настройки',
            show: 'slide',
            resizable: false,
            minHeight: 200,
            minWidth: 425,
            buttons:{
                Сохранить: function(){
                    var $name_dafault = tabs_menu_editor("#dialog-setting input[name='name']").val();
                    var $color_default = tabs_menu_editor("#dialog-setting input[name='color']").val();
                    var $bold_default = tabs_menu_editor("#dialog-setting input[name='bold']").attr('checked');
                    if ($bold_default) $bold_default = 1; else $bold_default = 0;

                    var delivery = {
                        'COLOR_DEFAULT': $color_default,
                        'NAME_DEFAULT': $name_dafault,
                        'STYLE_FRONTEND': style_menu,
                        'ORIENTATION': orientation,
                        'BOLD_DEFAULT': $bold_default
                    };

                    getPostAjax('text', 'setSettingDefaultAjax', delivery, false);

                    style_menu_default = style_menu;
                    orientation_default = orientation;
                    setStyleMenu();

                    name_default = $name_dafault;
                    color_default = $color_default;
                    bold_default  = $bold_default;

                    tabs_menu_editor(this).dialog("close");
                },
                Отмена: function(){
                    setStyleMenu();
                    tabs_menu_editor(this).dialog("close");
                }
            }
        });

    });


    function setStyleMenu(){
        tabs_menu_editor('#'+orientation_default+'_orientation').attr('checked', 'checked');
        tabs_menu_editor('#'+style_menu_default+'_style').attr('checked', 'checked');
        tabs_menu_editor('#img_style_menu').attr('src','/wa-apps/shop/plugins/menuShop/img/'+orientation_default+'/'+style_menu_default+'.png');
    }


    tabs_menu_editor("input[name='color']").keydown(function(eventObject){
        if(eventObject.which == 13){
            cp.setHex(this.value);
        }
    });

    tabs_menu_editor('.settingMenu').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    tabs_menu_editor('.helpMenu').click(function(){

        tabs_menu_editor("#dialog-help").dialog({
            modal:true,
            title: 'Справка',
            show: 'slide',
            resizable: false,
            minHeight: 200,
            minWidth: 600,
            buttons:{
                Ок: function(){
                    tabs_menu_editor(this).dialog("close");
                }
            }
        });
    });

    tabs_menu_editor('.helpMenu').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    setMaxSize();
    setStyleMenu();

});

function setMaxSize() {

    var li = tabs_menu_editor('.tabs_width_find');
    var max_size = 0;
    for(var i = 0; i<li.length; i++){
        if(parseInt(tabs_menu_editor(li[i]).height()) > parseInt(max_size))
            max_size = tabs_menu_editor(li[i]).height();
    }
    max_size = max_size + 15;
    tabs_menu_editor('.li_class').parent().height(max_size);
    tabs_menu_editor('.li_class').height(max_size);
    tabs_menu_editor('.li_class a').height(max_size);
    console.log(max_size);
}

function colorSetEditor(id_set, color){

    tabs_menu_editor('#color-picker').remove();
    var tag = tabs_menu_editor('<div id="color-picker" class="cp-default"><div class="picker-wrapper"><div id="picker" class="picker"></div><div id="picker-indicator" class="picker-indicator"></div></div><div class="slide-wrapper"><div id="slide" class="slide"></div><div id="slide-indicator" class="slide-indicator"></div></div></div>');
    tabs_menu_editor('#'+id_set).append(tag);

    cp = ColorPicker(document.getElementById('slide'), document.getElementById('picker'),
        function(hex, hsv, rgb, mousePicker, mouseSlide) {
            currentColor = hex;
            ColorPicker.positionIndicators(
                document.getElementById('slide-indicator'),
                document.getElementById('picker-indicator'),
                mouseSlide, mousePicker
            );
            tabs_menu_editor('#'+id_set).css('background-color',hex);
            tabs_menu_editor('#'+id_set+' input').val(hex);
        });
    cp.setHex(color);
}

function trim(s)
{
    return rtrim(ltrim(s));
}

function ltrim(s)
{
    return s.replace(/^\s+/, '');
}

function rtrim(s)
{
    return s.replace(/\s+$/, '');
}

function editMenu(id){
    var delivery = {'id': id};
    var dataBlock = getPostAjax('json', 'getDataBlockAjax', delivery, false);

    var name = tabs_menu_editor("#dialog-edit-block input[name='name']").val(dataBlock['name']);
    var link = tabs_menu_editor("#dialog-edit-block input[name='link']").val(dataBlock['link']);
    var prefix = tabs_menu_editor("#dialog-edit-block input[name='prefix']").val(dataBlock['prefix']);
    var bold = tabs_menu_editor("#dialog-edit-block input[name='bold']").attr('checked',dataBlock['bold']);
    var color = tabs_menu_editor("#dialog-edit-block input[name='color']").val(dataBlock['color']);

    tabs_menu_editor(name).val(dataBlock['name']);
    tabs_menu_editor(link).val(dataBlock['link']);
    tabs_menu_editor(prefix).val(dataBlock['prefix']);

    if(parseInt(dataBlock['bold']))
        tabs_menu_editor(bold).attr('checked', 'true');
    else
        tabs_menu_editor(bold).removeAttr('checked');

    tabs_menu_editor(color).val(dataBlock['color']);

    colorSetEditor('color-editor', dataBlock['color']);

    tabs_menu_editor("#dialog-edit-block").dialog({
        modal:true,
        title: 'Редактор блока',
        show: 'slide',
        resizable: false,
        minHeight: 200,
        minWidth: 400,
        buttons:{
            Сохранить: function(){
                var $bold_default = tabs_menu_editor(bold).attr('checked');
                if ($bold_default) $bold_default = 1; else $bold_default = 0;

                var delivery = {'id': id,'name': name.val(),'link': link.val(),'prefix': prefix.val(),'bold': $bold_default,'color': color.val()};
                getPostAjax('text', 'setDataBlockAjax', delivery, false);

                var tabs_name = tabs_menu_editor("#tabs-menu-editor a[href='#menuSuper_"+id+"'] .nameTabs");
                tabs_menu_editor(tabs_name).css('color', color.val());
                tabs_menu_editor(tabs_name).find('div:first').html(name.val());
                tabs_menu_editor(tabs_name).find('b').html(prefix.val());
                if($bold_default)
                    tabs_menu_editor(tabs_name).css('font-weight', 'bolder');
                else
                    tabs_menu_editor(tabs_name).css('font-weight', 'normal');

                setMaxSize();
                // setTimeout(function() {  }, 2000);

                tabs_menu_editor(this).dialog("close");
            },
            Отмена: function(){
                tabs_menu_editor(this).dialog("close");
            },
            Удалить: function(){
                var delivery = {'id': id};
                getPostAjax('text', 'removeSuperBlockAjax', delivery, false);
                location.reload();
                tabs_menu_editor(this).dialog("close");
            }
        }
    });
}

function addBlockAjax(parent,position,type){
    var delivery = {'type': type, 'name': name_default, 'position': position, 'color': color_default, 'bold': bold_default, 'parent': parent};
    var id = getPostAjax('text', 'addBlockAjax', delivery, false);
    location.reload();
}

function removeBannerAjax(id){
    var delivery = {'id': id};
    getPostAjax('text', 'removeBannerAjax', delivery, false);
    tabs_menu_editor('#banner_img_div_'+id).html('<img style="width: 200px;" id="banner_img_'+id+'" src="/wa-apps/shop/plugins/menuShop/img/not_banner.png"/>');
    tabs_menu_editor('#remove_banner_'+id).css('display','none');

    tabs_menu_editor('.removeBanner').mouseover(function(){
        tabs_menu_editor(this).css('cursor','pointer');
    });

    tabs_menu_editor('.removeBanner').click(function(){
        var remove_id = this.id.replace('remove_banner_','');
        removeBannerAjax(remove_id);
    });
}

function editPositionAjax(old_position, new_position, type){
    console.log(old_position, new_position, type);
    if(old_position >= 0){
        if(old_position != new_position){
            var delivery = {'old_position': old_position, 'new_position': new_position, 'type': type };
            getPostAjax('text', 'editPositionAjax', delivery, false);
        }
    }
}

function getPostAjax(type, inquiry, delivery, async){
    tabs_menu_editor.ajax({
        type: "POST",
        async : async,
        url: '?plugin=menuShop&module=settings',
        data:{'_csrf': csrf,'inquiry' : inquiry, 'array': delivery},
        dataType: type,
        success: function(data) {
            console.log(data);
            value = data;
        },
        error: function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    });
    return value;
}
