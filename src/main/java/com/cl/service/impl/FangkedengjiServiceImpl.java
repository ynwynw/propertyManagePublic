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


import com.cl.dao.FangkedengjiDao;
import com.cl.entity.FangkedengjiEntity;
import com.cl.service.FangkedengjiService;
import com.cl.entity.view.FangkedengjiView;

@Service("fangkedengjiService")
public class FangkedengjiServiceImpl extends ServiceImpl<FangkedengjiDao, FangkedengjiEntity> implements FangkedengjiService {
	

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<FangkedengjiEntity> page = this.selectPage(
                new Query<FangkedengjiEntity>(params).getPage(),
                new EntityWrapper<FangkedengjiEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<FangkedengjiEntity> wrapper) {
		  Page<FangkedengjiView> page =new Query<FangkedengjiView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<FangkedengjiView> selectListView(Wrapper<FangkedengjiEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public FangkedengjiView selectView(Wrapper<FangkedengjiEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
