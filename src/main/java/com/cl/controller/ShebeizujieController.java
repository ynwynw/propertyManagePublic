package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import com.cl.utils.ValidatorUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;

import com.cl.entity.ShebeizujieEntity;
import com.cl.entity.view.ShebeizujieView;

import com.cl.service.ShebeizujieService;
import com.cl.service.TokenService;
import com.cl.utils.PageUtils;
import com.cl.utils.R;
import com.cl.utils.EncryptUtil;
import com.cl.utils.MPUtil;
import com.cl.utils.CommonUtil;

/**
 * 设备租借
 * 后端接口
 * @author 
 * @email 
 * @date 2024-02-02 16:12:39
 */
@RestController
@RequestMapping("/shebeizujie")
public class ShebeizujieController {
    @Autowired
    private ShebeizujieService shebeizujieService;





    


    /**
     * 后端列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,ShebeizujieEntity shebeizujie, 
		HttpServletRequest request){

		String tableName = request.getSession().getAttribute("tableName").toString();
		if(tableName.equals("yezhu")) {
			shebeizujie.setYezhuzhanghao((String)request.getSession().getAttribute("username"));
		}
        EntityWrapper<ShebeizujieEntity> ew = new EntityWrapper<ShebeizujieEntity>();


		PageUtils page = shebeizujieService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, shebeizujie), params), params));
        return R.ok().put("data", page);
    }
    
    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,ShebeizujieEntity shebeizujie, 
		HttpServletRequest request){
        EntityWrapper<ShebeizujieEntity> ew = new EntityWrapper<ShebeizujieEntity>();

		PageUtils page = shebeizujieService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, shebeizujie), params), params));
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( ShebeizujieEntity shebeizujie){
       	EntityWrapper<ShebeizujieEntity> ew = new EntityWrapper<ShebeizujieEntity>();
      	ew.allEq(MPUtil.allEQMapPre( shebeizujie, "shebeizujie")); 
        return R.ok().put("data", shebeizujieService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(ShebeizujieEntity shebeizujie){
        EntityWrapper< ShebeizujieEntity> ew = new EntityWrapper< ShebeizujieEntity>();
 		ew.allEq(MPUtil.allEQMapPre( shebeizujie, "shebeizujie")); 
		ShebeizujieView shebeizujieView =  shebeizujieService.selectView(ew);
		return R.ok("查询设备租借成功").put("data", shebeizujieView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        ShebeizujieEntity shebeizujie = shebeizujieService.selectById(id);
		shebeizujie = shebeizujieService.selectView(new EntityWrapper<ShebeizujieEntity>().eq("id", id));
        return R.ok().put("data", shebeizujie);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        ShebeizujieEntity shebeizujie = shebeizujieService.selectById(id);
		shebeizujie = shebeizujieService.selectView(new EntityWrapper<ShebeizujieEntity>().eq("id", id));
        return R.ok().put("data", shebeizujie);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody ShebeizujieEntity shebeizujie, HttpServletRequest request){
    	shebeizujie.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(shebeizujie);

        shebeizujieService.insert(shebeizujie);
        return R.ok();
    }
    
    /**
     * 前端保存
     */
    @RequestMapping("/add")
    public R add(@RequestBody ShebeizujieEntity shebeizujie, HttpServletRequest request){
    	shebeizujie.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(shebeizujie);

        shebeizujieService.insert(shebeizujie);
        return R.ok();
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    public R update(@RequestBody ShebeizujieEntity shebeizujie, HttpServletRequest request){
        //ValidatorUtils.validateEntity(shebeizujie);
        shebeizujieService.updateById(shebeizujie);//全部更新
        return R.ok();
    }

    /**  
     * 审核 
     */   
    @RequestMapping("/shBatch")
    @Transactional
    public R update(@RequestBody Long[] ids, @RequestParam String sfsh, @RequestParam String shhf){
        List<ShebeizujieEntity> list = new ArrayList<ShebeizujieEntity>();
        for(Long id : ids) {
            ShebeizujieEntity shebeizujie = shebeizujieService.selectById(id);
            shebeizujie.setSfsh(sfsh);
            shebeizujie.setShhf(shhf);
            list.add(shebeizujie);
        }    
        shebeizujieService.updateBatchById(list);
        return R.ok();
    }    
    
    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        shebeizujieService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }
    
	







}
