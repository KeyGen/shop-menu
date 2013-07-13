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


class shopMenuShopPluginFrontendAction extends shopFrontendAction
{
    var $super;
    var $block_two;
    var $block_three;

    function execute(){

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
            $path = str_replace('frontend', "frontend/{$this->setting_default['ORIENTATION']}", $this->getTemplate());
            return $this->view->fetch(wa()->getAppPath($path,'shop'));
        }catch(Exception $e) {
            echo $e->getMessage();
        }
    }
}
