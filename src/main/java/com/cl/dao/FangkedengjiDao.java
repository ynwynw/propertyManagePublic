package com.cl.dao;

import com.cl.entity.FangkedengjiEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.FangkedengjiView;


/**
 * 访客登记
 * 
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
public interface FangkedengjiDao extends BaseMapper<FangkedengjiEntity> {
	
	List<FangkedengjiView> selectListView(@Param("ew") Wrapper<FangkedengjiEntity> wrapper);

	List<FangkedengjiView> selectListView(Pagination page,@Param("ew") Wrapper<FangkedengjiEntity> wrapper);
	
	FangkedengjiView selectView(@Param("ew") Wrapper<FangkedengjiEntity> wrapper);
	

}
