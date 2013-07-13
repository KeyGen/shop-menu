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

class shopMenuShopModel extends waModel
{
    protected $table = 'menuShop'; // название таблицы
    public $text;

    public function getSettingDefault() {
        $query = "SELECT setting,value FROM menuShopSetting";
        $arr = $this->query($query)->fetchAll();
        $settingOut = array();
        foreach ($arr as $key=>$value){
            $settingOut[$value['setting']] = $value['value'];
        }
        return $settingOut;
    }

    public function setSettingDefault($setting = array()) {
        if(!empty($setting)){
            foreach ( $setting as $key=>$value){
                $query = "UPDATE menuShopSetting SET value='$value' WHERE setting='$key'";
                $this->query($query);
            }
        }
    }

    public function getDataBlock($id){
        $query = "SELECT type,name,link,color,bold,prefix FROM $this->table WHERE id='$id'";
        $dataBlock = $this->query($query)->fetchAll();
        return $dataBlock[0];
    }

    public function setDataBlock($set_data){
        if(!empty($set_data)){
            $id = $set_data['id'];
            $str_set = '';
            foreach ( $set_data as $key=>$value){
                if($key != 'id'){
                    $str_set .= $key.'=\''.$value.'\', ';
                }
            }

            $str_set = substr($str_set, 0, strlen($str_set)-2);

            $query = "UPDATE $this->table SET $str_set WHERE id='$id'";
            $this->query($query);
        }
    }

    public function addBlock($type, $name, $position, $color, $bold, $parent){
        $query = "INSERT INTO $this->table (`type`,`name`, `position`, `color`, `bold`, `parent`) VALUES ('$type','$name', '$position', '$color','$bold','$parent')";
        $this->query($query);

        $query = "SELECT id FROM $this->table ORDER BY id DESC LIMIT 1";
        $order = $this->query($query)->fetchAll();
        return $order[0]['id'];
    }

    public function getSuperBlock(){
        $query = "SELECT * FROM $this->table WHERE type=0 AND parent=0 ORDER BY position ";
        return $this->query($query)->fetchAll();
    }

    public function getBlockTwo($parent){
        $query = "SELECT * FROM $this->table WHERE type=1 AND parent=$parent ORDER BY position ";
        return $this->query($query)->fetchAll();
    }

    public function getBlockThree($parent){
        $query = "SELECT * FROM $this->table WHERE type=2 AND parent=$parent ORDER BY position ";
        return $this->query($query)->fetchAll();
    }

    public function removeSuperBlock($id){
        $query = "SELECT banner,position,type FROM $this->table WHERE id='$id'";
        $oldBanner = $this->query($query)->fetchAll();

        $this->editPosition($oldBanner[0]['position'], $oldBanner[0]['position'], $oldBanner[0]['type']);

        $remove_id_str = $this->removeBlockRecursion($id);
        $remove_id_str .= $id;
        $this->text = '';

        $query = "DELETE FROM $this->table WHERE id IN ($remove_id_str)";
        $this->query($query);

        return $oldBanner[0]['banner'];
    }

    public function removeBlockRecursion($id){
        if(!(int)$id) return array();

        $query = "SELECT id,parent FROM $this->table WHERE parent=$id";
        $parent = $this->query($query)->fetchAll();

        foreach ($parent as $key=>$value){
            $block_remove[] = $this->removeBlockRecursion($value['id']);
        }

        foreach ($parent as $key=>$value){
            $this->text .= $value['id'].', ';
        }

        $strOut = '';
        if($this->text){
            return $this->text;
        } else {
            return false;
        }
    }

    public function removeBanner($id){
        $query = "SELECT banner FROM $this->table WHERE id='$id'";
        $oldBanner = $this->query($query)->fetchAll();

        $query = "UPDATE $this->table SET banner='' WHERE id='$id'";
        $this->query($query);

        return $oldBanner[0]['banner'];
    }

    public function editPosition($old_position, $new_position, $type){

        $query = "SELECT id FROM $this->table WHERE position=$old_position AND type=$type";
        $id = $this->query($query)->fetchAll();
        $id = $id[0]['id'];

        if($old_position < $new_position){

            $query = "SELECT id, position FROM  $this->table WHERE position<=$new_position AND position>$old_position AND type=$type ORDER BY position";
            $result = $this->query($query)->fetchAll();

            foreach ($result as $key=>$value){
                    $set_position = $value['position']-1;
                    $query = "UPDATE $this->table SET position=$set_position WHERE id={$value['id']} AND type=$type";
                    $this->query($query);
            }

            $query = "UPDATE $this->table SET `position`='$new_position' WHERE id='$id' AND type=$type";
            $this->query($query);
        }
        elseif ($old_position == $new_position){

            $query = "SELECT id, position FROM  $this->table WHERE position>$new_position AND type=$type ORDER BY position";
            $result = $this->query($query)->fetchAll();

            foreach ($result as $key=>$value){
                if($id != $value['id']){
                    $set_position = $value['position']-1;
                    $query = "UPDATE $this->table SET position=$set_position WHERE id={$value['id']} AND type=$type";
                    $this->query($query);
                }
            }
        }
        else{

            $query = "SELECT id, position FROM  $this->table WHERE position>=$new_position AND position<=$old_position AND type=$type ORDER BY position";
            $result = $this->query($query)->fetchAll();

            foreach ($result as $key=>$value){
                $set_position = $value['position']+1;
                $query = "UPDATE $this->table SET position=$set_position WHERE id={$value['id']} AND type=$type";
                $this->query($query);
            }

            $query = "UPDATE $this->table SET `position`='$new_position' WHERE id='$id' AND type=$type";
            $this->query($query);
        }

        echo 'position change!';
    }
}