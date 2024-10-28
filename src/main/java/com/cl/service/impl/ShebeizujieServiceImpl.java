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


import com.cl.dao.ShebeizujieDao;
import com.cl.entity.ShebeizujieEntity;
import com.cl.service.ShebeizujieService;
import com.cl.entity.view.ShebeizujieView;

@Service("shebeizujieService")
public class ShebeizujieServiceImpl extends ServiceImpl<ShebeizujieDao, ShebeizujieEntity> implements ShebeizujieService {
	

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<ShebeizujieEntity> page = this.selectPage(
                new Query<ShebeizujieEntity>(params).getPage(),
                new EntityWrapper<ShebeizujieEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<ShebeizujieEntity> wrapper) {
		  Page<ShebeizujieView> page =new Query<ShebeizujieView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<ShebeizujieView> selectListView(Wrapper<ShebeizujieEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public ShebeizujieView selectView(Wrapper<ShebeizujieEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
