package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.ShebeiguihaiEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ShebeiguihaiView;


/**
 * 设备归还
 *
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
public interface ShebeiguihaiService extends IService<ShebeiguihaiEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ShebeiguihaiView> selectListView(Wrapper<ShebeiguihaiEntity> wrapper);
   	
   	ShebeiguihaiView selectView(@Param("ew") Wrapper<ShebeiguihaiEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ShebeiguihaiEntity> wrapper);
   	

}

