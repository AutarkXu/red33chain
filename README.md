# 比特元公链evm智能合约部署文档-红包
标签：microzero 小零科技 33chain合约 www.dropay.net

---
[toc]
## 1.1 关于33chain evm合约的部署步骤

部署流程同ethereum、tron，需要注意的33chain的合约需要部署在平行链。

 - **步骤1**:编译合约源码

    evm源码编译方式很多，推荐使用remix、波场js库、truffle等。获得编译好的abi和bytecode。

 - **步骤2**: 调用33chain提供的rpc方法创建raw交易。

    向rpc端口发送 **Chain33.CreateTransaction** 的 method 来获取raw transaction。

    参考33chain官方文档此处:https://chain.33.cn/document/108#1.1%20%E5%88%9B%E5%BB%BAEVM%E5%90%88%E7%BA%A6%E4%BA%A4%E6%98%93%20CreateTransaction

 - **步骤3**:调用33chain提供的rpc方法广播raw交易。

    参考33chain官方文档此处:https://chain.33.cn/document/93#1.1.3%20%E5%8F%91%E9%80%81%E4%BA%A4%E6%98%93%20SendTransaction

 - **步骤4**:查询已部署的合约地址。

    查询合约地址方式是通过创建合约时得到的交易哈希，调用rpc查询该交易，智能合约地址在logs中的contractName字段。

    参考33chain官方文档此处:https://chain.33.cn/document/93#1.2%20%E6%A0%B9%E6%8D%AE%E5%93%88%E5%B8%8C%E6%9F%A5%E8%AF%A2%E4%BA%A4%E6%98%93%E4%BF%A1%E6%81%AF%20QueryTransaction

## 1.2 合约的调用
智能合约的调用分为两种方式：

 -  调用只读合约方法。

    只读方法的调用，使用rpc方法中的**Chain33.Query**发起数据查询。

    参考33chain官方文档此处:https://chain.33.cn/document/108#1.5%20EVM%E5%90%88%E7%BA%A6%E5%8F%AA%E8%AF%BB%E8%B0%83%E7%94%A8%EF%BC%88%E9%80%9A%E8%BF%87ABI%EF%BC%89

 - 调用非只读方法
    向rpc端口发送 **Chain33.CreateTransaction** 的 method 来创建调用合约的rawtransaction。再将创建好的tx广播出去。

    参考33chain官方文档此处:https://chain.33.cn/document/108#1.1%20%E5%88%9B%E5%BB%BAEVM%E5%90%88%E7%BA%A6%E4%BA%A4%E6%98%93%20CreateTransaction

## 1.3 合约部署、调用注意

1. 创建合约的钱包需要在主链有BTY代币，部署合约时调用平行链点端口。

2. 关于部署好的智能合约地址，需要查询交易详情获取。

3. 创建、调用时，fee字段必填，gas相关的字段忽略。

4. 调用Chain33.Query这个rpc方法时，execr传 “user.p.game.evm”(平行链的title)。

5. 创建对合约的写操作exec填写contractName。

6.在调用合约进行代币的转账时，需要把代币先充值或提出到**大合约**（细节咨询33chain官方）再进行合约操作，即调用*payable*类型的合约方法进行代币转移时需要先走**大合约**这个中间桥梁，代码上体现为向大合约地址转账获得操作余额。

## 1.4 抢红包合约。

部署调用方式遵循1.1-1.3的操作步骤，也可以使用JS脚本一键部署，脚本链接：https://github.com/AutarkXu/red33chain.git

注意：

- 在游戏上线前需要调用合约方法switchCharge来打开充值、提现功能的开关，否则交易会失败。js脚本中提供了这个方法。

- airdop方法存在合约随机数攻击风险，未使用。

- 用户属性user中redID，已弃用。



