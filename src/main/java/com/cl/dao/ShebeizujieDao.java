package com.cl.dao;

import com.cl.entity.ShebeizujieEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ShebeizujieView;


/**
 * 设备租借
 * 
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
public interface ShebeizujieDao extends BaseMapper<ShebeizujieEntity> {
	
	List<ShebeizujieView> selectListView(@Param("ew") Wrapper<ShebeizujieEntity> wrapper);

	List<ShebeizujieView> selectListView(Pagination page,@Param("ew") Wrapper<ShebeizujieEntity> wrapper);
	
	ShebeizujieView selectView(@Param("ew") Wrapper<ShebeizujieEntity> wrapper);
	

}
