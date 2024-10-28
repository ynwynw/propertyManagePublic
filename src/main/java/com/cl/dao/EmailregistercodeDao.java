package com.cl.dao;

import com.cl.entity.EmailregistercodeEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.EmailregistercodeView;


/**
 * 邮箱验证码
 * 
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
public interface EmailregistercodeDao extends BaseMapper<EmailregistercodeEntity> {
	
	List<EmailregistercodeView> selectListView(@Param("ew") Wrapper<EmailregistercodeEntity> wrapper);

	List<EmailregistercodeView> selectListView(Pagination page,@Param("ew") Wrapper<EmailregistercodeEntity> wrapper);
	
	EmailregistercodeView selectView(@Param("ew") Wrapper<EmailregistercodeEntity> wrapper);
	

}
