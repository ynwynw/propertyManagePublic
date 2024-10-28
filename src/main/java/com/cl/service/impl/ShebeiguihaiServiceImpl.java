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


import com.cl.dao.ShebeiguihaiDao;
import com.cl.entity.ShebeiguihaiEntity;
import com.cl.service.ShebeiguihaiService;
import com.cl.entity.view.ShebeiguihaiView;

@Service("shebeiguihaiService")
public class ShebeiguihaiServiceImpl extends ServiceImpl<ShebeiguihaiDao, ShebeiguihaiEntity> implements ShebeiguihaiService {
	

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<ShebeiguihaiEntity> page = this.selectPage(
                new Query<ShebeiguihaiEntity>(params).getPage(),
                new EntityWrapper<ShebeiguihaiEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<ShebeiguihaiEntity> wrapper) {
		  Page<ShebeiguihaiView> page =new Query<ShebeiguihaiView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<ShebeiguihaiView> selectListView(Wrapper<ShebeiguihaiEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public ShebeiguihaiView selectView(Wrapper<ShebeiguihaiEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
