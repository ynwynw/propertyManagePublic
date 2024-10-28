package com.cl.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cl.utils.PageUtils;
import com.cl.utils.Query;


import com.cl.dao.JiaofeitixingDao;
import com.cl.entity.JiaofeitixingEntity;
import com.cl.service.JiaofeitixingService;
import com.cl.entity.view.JiaofeitixingView;

@Service("jiaofeitixingService")
public class JiaofeitixingServiceImpl extends ServiceImpl<JiaofeitixingDao, JiaofeitixingEntity> implements JiaofeitixingService {
	

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<JiaofeitixingEntity> page = this.selectPage(
                new Query<JiaofeitixingEntity>(params).getPage(),
                new EntityWrapper<JiaofeitixingEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<JiaofeitixingEntity> wrapper) {
		  Page<JiaofeitixingView> page =new Query<JiaofeitixingView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<JiaofeitixingView> selectListView(Wrapper<JiaofeitixingEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public JiaofeitixingView selectView(Wrapper<JiaofeitixingEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
