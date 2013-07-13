<?php

//Menu shop - краткое описание на английском
//Copyright (C) 2012 KeyGen <developer.webasyst@yandex.ua>
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


return array(
    'name' => 'Menu shop',
    'description' => 'Menu Editor to store',
    'vendor'=>'KeyGen',
    'version'=>'1.0.0',
    'img'=>'img/menuShopKeyGen16.png',
    'shop_settings' => true,
    'frontend'    => true,
    'backend'    => true,
    'icon'        => array(
        16 => 'img/menuShopKeyGen16.png',
        24 => 'img/menuShopKeyGen24.png',
        48 => 'img/menuShopKeyGen32.png',
        64 => 'img/menuShopKeyGen64.png',
    ),
    'handlers'    => array(
        'frontend_head'  => 'menuShopFrontend',
    ),
);