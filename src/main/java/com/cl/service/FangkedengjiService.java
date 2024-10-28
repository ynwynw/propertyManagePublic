package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.FangkedengjiEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.FangkedengjiView;


/**
 * 访客登记
 *
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
public interface FangkedengjiService extends IService<FangkedengjiEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<FangkedengjiView> selectListView(Wrapper<FangkedengjiEntity> wrapper);
   	
   	FangkedengjiView selectView(@Param("ew") Wrapper<FangkedengjiEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<FangkedengjiEntity> wrapper);
   	

}

