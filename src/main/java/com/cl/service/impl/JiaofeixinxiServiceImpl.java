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


import com.cl.dao.JiaofeixinxiDao;
import com.cl.entity.JiaofeixinxiEntity;
import com.cl.service.JiaofeixinxiService;
import com.cl.entity.view.JiaofeixinxiView;

@Service("jiaofeixinxiService")
public class JiaofeixinxiServiceImpl extends ServiceImpl<JiaofeixinxiDao, JiaofeixinxiEntity> implements JiaofeixinxiService {
	

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<JiaofeixinxiEntity> page = this.selectPage(
                new Query<JiaofeixinxiEntity>(params).getPage(),
                new EntityWrapper<JiaofeixinxiEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<JiaofeixinxiEntity> wrapper) {
		  Page<JiaofeixinxiView> page =new Query<JiaofeixinxiView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<JiaofeixinxiView> selectListView(Wrapper<JiaofeixinxiEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public JiaofeixinxiView selectView(Wrapper<JiaofeixinxiEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}

    @Override
    public List<Map<String, Object>> selectValue(Map<String, Object> params, Wrapper<JiaofeixinxiEntity> wrapper) {
        return baseMapper.selectValue(params, wrapper);
    }

    @Override
    public List<Map<String, Object>> selectTimeStatValue(Map<String, Object> params, Wrapper<JiaofeixinxiEntity> wrapper) {
        return baseMapper.selectTimeStatValue(params, wrapper);
    }

    @Override
    public List<Map<String, Object>> selectGroup(Map<String, Object> params, Wrapper<JiaofeixinxiEntity> wrapper) {
        return baseMapper.selectGroup(params, wrapper);
    }



}
