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


import com.cl.dao.WeixiuleixingDao;
import com.cl.entity.WeixiuleixingEntity;
import com.cl.service.WeixiuleixingService;
import com.cl.entity.view.WeixiuleixingView;

@Service("weixiuleixingService")
public class WeixiuleixingServiceImpl extends ServiceImpl<WeixiuleixingDao, WeixiuleixingEntity> implements WeixiuleixingService {
	

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<WeixiuleixingEntity> page = this.selectPage(
                new Query<WeixiuleixingEntity>(params).getPage(),
                new EntityWrapper<WeixiuleixingEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<WeixiuleixingEntity> wrapper) {
		  Page<WeixiuleixingView> page =new Query<WeixiuleixingView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<WeixiuleixingView> selectListView(Wrapper<WeixiuleixingEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public WeixiuleixingView selectView(Wrapper<WeixiuleixingEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
