package com.cl.dao;

import com.cl.entity.ShebeiguihaiEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ShebeiguihaiView;


/**
 * 设备归还
 * 
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
public interface ShebeiguihaiDao extends BaseMapper<ShebeiguihaiEntity> {
	
	List<ShebeiguihaiView> selectListView(@Param("ew") Wrapper<ShebeiguihaiEntity> wrapper);

	List<ShebeiguihaiView> selectListView(Pagination page,@Param("ew") Wrapper<ShebeiguihaiEntity> wrapper);
	
	ShebeiguihaiView selectView(@Param("ew") Wrapper<ShebeiguihaiEntity> wrapper);
	

}
