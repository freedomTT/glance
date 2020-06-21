# -*- coding=UTF-8 -*-

import os
import time
import requests
from lxml import etree
import pymysql

url = "https://s.weibo.com/top/summary?cate=realtimehot"
headers={
    'Host': 's.weibo.com',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Referer': 'https://weibo.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
}

r = requests.get(url,headers=headers)
print(r.status_code)

html_xpath = etree.HTML(r.text)
data = html_xpath.xpath('//*[@id="pl_top_realtimehot"]/table/tbody/tr')
num = -1

items = []
querytime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
for tr in (data):
    title = tr.xpath('./td[2]/a/text()')
    hot_score = tr.xpath('./td[2]/span/text()')
    status = tr.xpath('./td[3]/i/text()')
    num += 1

    # 过滤第 0 条
    if num == 0:
        pass
    else:
        # print(num,title[0],'热度：',hot_score[0],'状态：',status[0] if len(status) else '')
        items.append((title[0],hot_score[0],status[0] if len(status) else '',querytime))

# 建立数据库连接
conn=pymysql.connect(
    host='120.78.84.46',
    port=3306,
    user='root',
    password='luozhongdao@931121',
    db='app',
    charset='utf8mb4'
)
 
# 获取游标
cursor=conn.cursor(pymysql.cursors.DictCursor)
 
# 执行sql语句
sql='insert into weibo_hotsearch(title,hot,status,datetime) values(%s,%s,%s,%s)'
rows=cursor.executemany(sql,items)
 
# 提交
conn.commit()

# 关闭游标
cursor.close()
 
# 关闭连接
conn.close()
 
# 判断是否连接成功
if rows >= 0:
    print(rows,'连接数据库成功')
else:
    print('连接数据库失败')




