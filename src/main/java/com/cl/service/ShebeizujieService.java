package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.ShebeizujieEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ShebeizujieView;


/**
 * 设备租借
 *
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
public interface ShebeizujieService extends IService<ShebeizujieEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ShebeizujieView> selectListView(Wrapper<ShebeizujieEntity> wrapper);
   	
   	ShebeizujieView selectView(@Param("ew") Wrapper<ShebeizujieEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ShebeizujieEntity> wrapper);
   	

}

