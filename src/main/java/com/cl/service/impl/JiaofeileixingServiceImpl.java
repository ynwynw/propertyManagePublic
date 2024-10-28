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


import com.cl.dao.JiaofeileixingDao;
import com.cl.entity.JiaofeileixingEntity;
import com.cl.service.JiaofeileixingService;
import com.cl.entity.view.JiaofeileixingView;

@Service("jiaofeileixingService")
public class JiaofeileixingServiceImpl extends ServiceImpl<JiaofeileixingDao, JiaofeileixingEntity> implements JiaofeileixingService {
	

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<JiaofeileixingEntity> page = this.selectPage(
                new Query<JiaofeileixingEntity>(params).getPage(),
                new EntityWrapper<JiaofeileixingEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<JiaofeileixingEntity> wrapper) {
		  Page<JiaofeileixingView> page =new Query<JiaofeileixingView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<JiaofeileixingView> selectListView(Wrapper<JiaofeileixingEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public JiaofeileixingView selectView(Wrapper<JiaofeileixingEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
