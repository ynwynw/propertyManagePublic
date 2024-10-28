package com.cl.entity.view;

import com.cl.entity.ShebeixinxiEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;

import java.io.Serializable;
import com.cl.utils.EncryptUtil;
 

/**
 * 设备信息
 * 后端返回视图实体辅助类   
 * （通常后端关联的表或者自定义的字段需要返回使用）
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
@TableName("shebeixinxi")
public class ShebeixinxiView  extends ShebeixinxiEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	public ShebeixinxiView(){
	}
 
 	public ShebeixinxiView(ShebeixinxiEntity shebeixinxiEntity){
 	try {
			BeanUtils.copyProperties(this, shebeixinxiEntity);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		
	}


}
