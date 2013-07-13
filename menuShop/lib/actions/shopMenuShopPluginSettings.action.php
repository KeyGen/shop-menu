<?php

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


class shopMenuShopPluginSettingsAction extends waViewAction
{

    var $super;
    var $block_two;
    var $block_three;
    var $setting_default;

    function execute(){

        switch($_POST['inquiry']){
            case 'addBlockAjax':
                echo $this->addBlockAjax($_POST['array']['type'],$_POST['array']['name'],$_POST['array']['position'],$_POST['array']['color'],$_POST['array']['bold'],$_POST['array']['parent']);
                exit;
            case 'removeSuperBlockAjax':
                echo $this->removeSuperBlockAjax($_POST['array']['id']);
                exit;
            case 'removeBannerAjax':
                echo $this->removeBannerAjax($_POST['array']['id']);
                exit;
            case 'editPositionAjax':
                echo $this->editPositionAjax($_POST['array']['old_position'], $_POST['array']['new_position'], $_POST['array']['type']);
                exit;
            case 'setSettingDefaultAjax':
                echo $this->setSettingDefaultAjax($_POST['array']);
                exit;
            case 'getDataBlockAjax':
                echo json_encode($this->getDataBlockAjax($_POST['array']['id']));
                exit;
            case 'setDataBlockAjax':
                echo $this->setDataBlockAjax($_POST['array']);
                exit;
        }

        try {
            $model = new shopMenuShopModel();
            $this->super = $model->getSuperBlock();

            foreach ($this->super as $key=>$value){
                $this->block_two[$value['id']] = $model->getBlockTwo($value['id']);

                foreach ($this->block_two[$value['id']] as $key_three=>$value_three){
                    $this->block_three[$value_three['id']] = $model->getBlockThree($value_three['id']);
                }
            }

            $this->setting_default = $model->getSettingDefault();
            $this->view->assign('menu', $this);
            return $this->view->fetch(wa()->getAppPath($this->getTemplate(),'shop'));

        }catch(Exception $e) {
            echo $e->getMessage();
        }
    }

    public function setDataBlockAjax($set_data){
        $model = new shopMenuShopModel();
        $model->setDataBlock($set_data);
        return 'Обновление успешно';
    }

    public function getDataBlockAjax($id){
        $model = new shopMenuShopModel();
        return $model->getDataBlock($id);
    }

    public function setSettingDefaultAjax($setting){
        $model = new shopMenuShopModel();
        return $model->setSettingDefault($setting);
        return 'Setting save';
    }

    public function editPositionAjax($old_position, $new_position, $type){
        $model = new shopMenuShopModel();
        return $model->editPosition($old_position, $new_position, $type);
    }

    public function addBlockAjax($type, $name, $position, $color, $bold, $parent){
        $model = new shopMenuShopModel();
        return $model->addBlock($type, $name, $position, $color, $bold, $parent);
    }

    public function removeSuperBlockAjax($id){
        $model = new shopMenuShopModel();
        $oldBanner = $model->removeSuperBlock($id);

        if($oldBanner != ''){
            unlink($_SERVER['DOCUMENT_ROOT'].$oldBanner);
        }
    }

    public function removeBannerAjax($id){
        $model = new shopMenuShopModel();
        $oldBanner = $model->removeBanner($id);
        if($oldBanner != ''){
            unlink($_SERVER['DOCUMENT_ROOT'].$oldBanner);
        }
    }

}