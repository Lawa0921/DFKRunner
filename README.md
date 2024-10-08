## DFK 自動化腳本，內含多個功能腳本，其中包含：
1. 自動做任務 ( 包含 profession 及 training quest ， DFK 及 KLAY 都可使用 )
2. 自動掛售上下架 ( DFK 及 KLAY 都可使用 )
3. 自動升級 ( DFK 及 KLAY 都可使用 )
4. 自動購買 ( 可監聽 DFK 及 KLAY 的上架 )
5. 檢查自己各帳號的持有情況 ( DFK 及 KLAY 都可使用 )
6. 自動估價出租 ( DFK 及 KLAY 都可使用 )
7. 自動 duel ( DFK 及 KLAY 可使用 )
8. 查看近期出租紀錄 ( DFK 及 KLAY 都可使用 )
9. 自動道具換金 ( DFK 及 KLAY 都可使用 )
10. 自動轉移英雄 ( DFK 及 KLAY 都可使用 )
11. 自動使用藥水 ( DFK 及 KLAY 都可使用 )
12. 自動放抽獎券進抽獎池 ( DFK 及 KLAY 可使用 )
13. 自動領空投 ( DFK 及 KLAY 可使用 )

## 環境建置
首先您需要依據作業系統安裝 git、node、npm。

#### 為何我需要安裝這些？
git 幫助您與 github 互動，並且可以更新您本地的檔案至目前最新的版本。  
node.js 是一個能執行 JavaScript 的環境，因為本專案是用 javascript 寫成，您的本地環境需要可以執行 javascript 程式碼才能夠運行。  
npm 即為 Node Package Manager 的縮寫，是一個管理 node.js 插件的工具，本專案使用此工具協助管理外部套件的相依性。  

### Mac 篇

##### Homebrew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" # 安裝 homebrew
brew --version # 確認是否安裝成功
```

##### git

```
brew install git                                     # 利用 homebrew 安裝 git
git --version                                        # 確認是否安裝成功
git config --global user.name "Your user name"       # 設定 git 的 username
git config --global user.email "youremail@gmail.com" # 設定 git 的 email
```

##### node.js 與 npm
```
brew install node # 利用 homebrew 安裝 node.js 與 npm
node -v           # 檢查 node.js 是否安裝成功
npm -v            # 檢查 npm 是否安裝成功
```

### Windows 篇

[node、npm 安裝教學](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)  
[git 安裝教學](https://www.atlassian.com/git/tutorials/install-git#windows)  

按 Win 並開啟與 git 一同下載下來的 gitBash 開始準備安裝，並且後續之後的操作也基本上都可以用 gitBash 完成。  

## 第一次使用前

[設定 github 驗證](https://andy6804tw.github.io/2021/08/14/token-authentication-requirements-for-git-operations)  
[下載 VSCode 程式碼編輯器](https://code.visualstudio.com/)  

```
git clone https://github.com/Lawa0921/DFKRunner.git # 複製專案至您的本地
cd DFKRunner                                        # 切換目錄至 DFKQuestRunner
npm install                                         # 利用 npm 安裝專案會使用到的套件
```

### 設定 .env 檔

在 DFKRunner 的目錄內新增一個 `.env` 檔案  
並輸入以下內容即可，請自行替換您的私鑰與地址進入 `.env` 檔  
如果你的帳號只有一個，那請刪除後方的 /{...} 部分
```
ADDRESS_AND_PRIVATE_KEY_MAPPINGS={"accountName": "yourAccountName", "walletAddress": "yourWalletAddress", "privateKey": "yourPrivateKey"}/{"accountName": ..., "walletAddress": ..., "privateKey": ...}
```

### 設定 .config 檔

開啟 VSCode 將 `config.js` 內的內容更換為您的英雄  
格式依照原先的 config 範例參考設定即可  
所有的 key 都必須保留下來，你只會更改值的部分  
使用前請移除所有不屬於你的英雄 ID 

## 腳本說明
以下所有的指令您都必須確認你當前的目錄在 `DFKRunner` 底下才能正確執行  

`bash run.sh`：自動執行任務及掛售的邏輯，在手動停止之前他會不停執行  
`bash run_sale_watcher.sh`：開始監聽酒館的出售，會自動購買達到指定條件的英雄，詳細估價內容可看 `/src/services/valuator.js` 這個檔案  
`bash run_auto_dueler.sh`：開始自動 duel。  
`node config_parser.js`：檢查 config 內的所有帳號持有情況，可找到寫在 config 內但非自己持有的英雄，能找到在你的地址但是未寫在 config 內的英雄 ID  
`node rerenter.js`：找到所有出租中的英雄，重新估價並執行上下架邏輯  
`node item_seller.js`：自動將你的道具換成 gold  
`node sale_auction_parser.js`：爬取所有正在販售的英雄，抓出與估價接近的英雄  
`node bridge_hero.js`：大量跨英雄的腳本，支援 DFK 、 KLAY 鏈互轉  

## 關於更新
確保您在 `DFKRunner` 的目錄內，並執行
```
git pull origin main
```

即可完成更新
#### 更新注意事項
更新前請先將您的 config 檔另外保存  
否則將會觸發 git 的 conflict 機制  
比較簡單的處理方式是直接刪除您原先的 config.js 並拉取新版本的 config.js  
之後再填回您自己的 hero ID  

#### 為什麼會無法更新
執行 `git pull origin main` 時有可能會出現 `Already up to date.` 的提示  
原因是你的本地 git 已經把所有節點都抓過了  
但因為我遠端很難判斷你本地檔案的狀態  
因此當發生這個情況時請使用 `git clone https://github.com/Lawa0921/DFKRunner.git` 指令重新安裝  
以保證你的專案檔案完整  

## 鳴謝及其他資訊
有任何問題可至 [Lawa 的 Discord](https://discord.gg/Wta7ZavFkJ) 內 tag Lawa0921 詢問  
如果你想給我點小費可以匯款至我的私人地址：0x499FD90959AEfDaaE82268A79e23cD83dAA8B396，Lawa 先感謝您  
祝您遊玩愉快  
