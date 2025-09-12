class KokoApp {
    constructor() {
        this.video = null;
        this.canvas = null;
        this.currentStream = null;
        this.scanHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]');
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.currentLanguage = localStorage.getItem('language') || 'ko';
        this.isLoading = false;
        this.recognition = null;
        
        // 바코드 스캐너 관련
        this.html5QrcodeScanner = null;
        this.isScanning = false;
        
        // 다크모드 설정
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // 번역 시스템 - 4개 언어만 유지
        this.translations = {
            ko: {
                searchPlaceholder: "상품명이나 바코드를 검색하세요",
                welcome: "한국 상품을 쉽게 알아보세요!",
                welcomeDesc: "카메라로 찍거나 바코드를 스캔하면<br>AI가 상품 정보를 분석해드립니다.",
                analyzedProducts: "분석된 상품",
                accuracy: "정확도 %",
                scanMethod: "스캔 방법 선택",
                scanMethodDesc: "원하는 방법으로 상품을 스캔해보세요",
                photoScan: "사진으로 스캔",
                photoScanDesc: "카메라로 상품 촬영",
                barcodeScan: "바코드 스캔",
                barcodeScanDesc: "바코드로 빠른 인식",
                recentScans: "최근 스캔 기록",
                popularCategories: "인기 상품 카테고리",
                categoriesDesc: "관광객들이 많이 찾는 한국 상품들",
                tip: "팁:",
                tipDesc: "밝은 곳에서 촬영하면 더 정확한 분석이 가능해요!",
                analyzing: "AI가 분석 중입니다",
                recognizing: "상품을 인식하고 있어요...",
                home: "홈",
                favorites: "찜",
                camera: "카메라",
                viewAll: "전체보기",
                noScans: "아직 스캔 기록이 없습니다.",
                scanProduct: "상품을 스캔해보세요!",
                productAnalysis: "상품 분석 결과",
                productDesc: "상품 설명",
                nutritionInfo: "영양 정보",
                addFavorites: "찜하기",
                share: "공유하기",
                calories: "칼로리:",
                fat: "지방:",
                sodium: "나트륨:",
                carbs: "탄수화물:",
                close: "닫기",
                categoryExplore: "카테고리의 인기 상품들을 확인해보세요.",
                favoritesTitle: "찜한 상품",
                noFavorites: "찜한 상품이 없습니다.",
                startFavoriting: "마음에 드는 상품을 찜해보세요!",
                removeFavorite: "찜 해제",
                themeLight: "라이트 모드",
                themeDark: "다크 모드"
            },
            en: {
                searchPlaceholder: "Search products or barcodes",
                welcome: "Discover Korean Products Easily!",
                welcomeDesc: "Take a photo or scan a barcode<br>AI will analyze product information for you.",
                analyzedProducts: "Products Analyzed",
                accuracy: "Accuracy %",
                scanMethod: "Choose Scan Method",
                scanMethodDesc: "Scan products the way you want",
                photoScan: "Photo Scan",
                photoScanDesc: "Take photo of product",
                barcodeScan: "Barcode Scan",
                barcodeScanDesc: "Quick recognition with barcode",
                recentScans: "Recent Scans",
                popularCategories: "Popular Categories",
                categoriesDesc: "Korean products popular with tourists",
                tip: "Tip:",
                tipDesc: "Take photos in bright places for more accurate analysis!",
                analyzing: "AI is analyzing",
                recognizing: "Recognizing the product...",
                home: "Home",
                favorites: "Favorites",
                camera: "Camera",
                viewAll: "View All",
                noScans: "No scan history yet.",
                scanProduct: "Try scanning a product!",
                productAnalysis: "Product Analysis Result",
                productDesc: "Product Description",
                nutritionInfo: "Nutrition Information",
                addFavorites: "Add to Favorites",
                share: "Share",
                calories: "Calories:",
                fat: "Fat:",
                sodium: "Sodium:",
                carbs: "Carbs:",
                close: "Close",
                categoryExplore: "Check out popular products in this category.",
                favoritesTitle: "Favorite Products",
                noFavorites: "No favorite products yet.",
                startFavoriting: "Start adding products to your favorites!",
                removeFavorite: "Remove from Favorites",
                themeLight: "Light Mode",
                themeDark: "Dark Mode"
            },
            zh: {
                searchPlaceholder: "搜索产品或条形码",
                welcome: "轻松了解韩国产品！",
                welcomeDesc: "拍照或扫描条形码<br>AI将为您分析产品信息。",
                analyzedProducts: "已分析产品",
                accuracy: "准确率 %",
                scanMethod: "选择扫描方式",
                scanMethodDesc: "用您想要的方式扫描产品",
                photoScan: "拍照扫描",
                photoScanDesc: "用相机拍摄产品",
                barcodeScan: "条形码扫描",
                barcodeScanDesc: "条形码快速识别",
                recentScans: "最近扫描记录",
                popularCategories: "热门商品类别",
                categoriesDesc: "游客常找的韩国产品",
                tip: "提示:",
                tipDesc: "在明亮的地方拍摄可以更准确地分析！",
                analyzing: "AI正在分析",
                recognizing: "正在识别产品...",
                home: "首页",
                favorites: "收藏",
                camera: "相机",
                viewAll: "查看全部",
                noScans: "暂无扫描记录。",
                scanProduct: "试着扫描产品！",
                productAnalysis: "产品分析结果",
                productDesc: "产品说明",
                nutritionInfo: "营养信息",
                addFavorites: "添加收藏",
                share: "分享",
                calories: "卡路里:",
                fat: "脂肪:",
                sodium: "钠:",
                carbs: "碳水化合物:",
                close: "关闭",
                categoryExplore: "查看此类别的热门产品。",
                favoritesTitle: "收藏产品",
                noFavorites: "暂无收藏产品。",
                startFavoriting: "开始收藏您喜欢的产品！",
                removeFavorite: "取消收藏",
                themeLight: "浅色模式",
                themeDark: "深色模式"
            },
            ja: {
                searchPlaceholder: "商品名またはバーコードを検索",
                welcome: "韓国の商品を簡単に調べよう！",
                welcomeDesc: "カメラで撮影またはバーコードをスキャンすると<br>AIが商品情報を分析します。",
                analyzedProducts: "分析された商品",
                accuracy: "精度 %",
                                scanMethod: "スキャン方法を選択",
                scanMethodDesc: "お好みの方法で商品をスキャンしてください",
                photoScan: "写真でスキャン",
                photoScanDesc: "カメラで商品を撮影",
                barcodeScan: "バーコードスキャン",
                barcodeScanDesc: "バーコードで素早く認識",
                recentScans: "最近のスキャン履歴",
                popularCategories: "人気商品カテゴリー",
                categoriesDesc: "観光客に人気の韓国商品",
                tip: "ヒント:",
                tipDesc: "明るい場所で撮影するとより正確な分析が可能です！",
                analyzing: "AIが分析中です",
                recognizing: "商品を認識しています...",
                home: "ホーム",
                favorites: "お気に入り",
                camera: "カメラ",
                viewAll: "すべて表示",
                noScans: "スキャン履歴がありません。",
                scanProduct: "商品をスキャンしてみてください！",
                productAnalysis: "商品分析結果",
                productDesc: "商品説明",
                nutritionInfo: "栄養情報",
                addFavorites: "お気に入りに追加",
                share: "シェア",
                calories: "カロリー:",
                fat: "脂肪:",
                sodium: "ナトリウム:",
                carbs: "炭水化物:",
                close: "閉じる",
                categoryExplore: "このカテゴリーの人気商品をチェックしてください。",
                favoritesTitle: "お気に入り商品",
                noFavorites: "お気に入り商品がありません。",
                startFavoriting: "お気に入りの商品を追加しましょう！",
                removeFavorite: "お気に入りから削除",
                themeLight: "ライトモード",
                themeDark: "ダークモード"
            }
        };
        
        this.init();
    }

    init() {
        this.showSplashScreen();
        
        setTimeout(() => {
            this.setupEventListeners();
            this.loadScanHistory();
            this.loadFavorites();
            this.setupLanguage();
            this.setupTheme();
            this.animateCounters();
            this.setupVoiceSearch();
            console.log('앱 초기화 완료');
        }, 100);
    }

    showSplashScreen() {
        const splashScreen = document.getElementById('splashScreen');
        
        setTimeout(() => {
            splashScreen.style.animation = 'splashFadeOut 1s ease-in-out forwards';
        }, 3000);
        
        setTimeout(() => {
            splashScreen.remove();
            const appContainer = document.getElementById('appContainer');
            if (appContainer) {
                appContainer.style.opacity = '1';
                appContainer.style.visibility = 'visible';
            }
        }, 4000);
        
        setTimeout(() => {
            this.forceShowUI();
        }, 4500);
    }

    forceShowUI() {
        document.querySelectorAll('.fade-in-up').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
        
        const appContainer = document.getElementById('appContainer');
        if (appContainer) {
            appContainer.style.opacity = '1';
            appContainer.style.visibility = 'visible';
        }
    }

    animateCounters() {
        setTimeout(() => {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const increment = target / 60;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                        if (target === 98) {
                            counter.textContent += '%';
                        }
                    }
                };
                
                updateCounter();
            });
        }, 5000);
    }

    // ===== 다크모드 관련 메서드 =====
    
    setupTheme() {
        // 저장된 테마 적용
        this.applyTheme(this.currentTheme);
        
        // 테마 토글 버튼 이벤트 리스너 추가
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        
        // 로컬 스토리지에 저장
        localStorage.setItem('theme', this.currentTheme);
        
        // 알림 표시
        const lang = this.translations[this.currentLanguage];
        const themeName = this.currentTheme === 'dark' ? lang.themeDark : lang.themeLight;
        this.showNotification(`${themeName}로 변경되었습니다.`, 'success');
    }

    applyTheme(theme) {
        const body = document.body;
        const appContainer = document.getElementById('appContainer');
        
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (appContainer) {
                appContainer.setAttribute('data-theme', 'dark');
            }
        } else {
            body.removeAttribute('data-theme');
            if (appContainer) {
                appContainer.removeAttribute('data-theme');
            }
        }
        
        // 테마 토글 버튼 아이콘 업데이트
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
                themeToggle.title = '라이트 모드로 전환';
            } else {
                icon.className = 'fas fa-moon';
                themeToggle.title = '다크 모드로 전환';
            }
        }
    }

    setupEventListeners() {
        // 스캔 버튼 이벤트
        document.getElementById('photoScan').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            setTimeout(() => this.startCamera(), 200);
        });

        document.getElementById('barcodeScan').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            setTimeout(() => this.startBarcodeScanner(), 200);
        });

        // 카메라 네비게이션 버튼
        document.getElementById('cameraNavBtn').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            this.switchTab(e.currentTarget);
            setTimeout(() => this.startCamera(), 200);
        });

        // 카메라 제어 버튼
        document.getElementById('captureBtn').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget, 'capture');
            this.capturePhoto();
        });

        document.getElementById('closeCamera').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            this.stopCamera();
        });

        document.getElementById('switchCamera')?.addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            this.switchCamera();
        });

        // 결과 닫기
        document.getElementById('closeResult').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            this.closeResults();
        });

        // 바코드 입력 관련 이벤트
        document.getElementById('closeBarcodeInput').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            this.closeBarcodeInput();
        });

        document.getElementById('submitBarcode').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            this.submitBarcodeManual();
        });

        // 바코드 카메라 스캔 버튼
        document.getElementById('startBarcodeCamera').addEventListener('click', (e) => {
            this.addClickEffect(e.currentTarget);
            if (this.isScanning) {
                this.stopBarcodeCamera();
            } else {
                this.startBarcodeCamera();
            }
        });

        document.getElementById('barcodeManualInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitBarcodeManual();
            }
            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });

        // 입력 방법 전환
        document.querySelectorAll('.input-method').forEach(method => {
            method.addEventListener('click', (e) => {
                this.switchInputMethod(e.currentTarget);
            });
        });

        // 검색 기능
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        searchInput.addEventListener('focus', () => {
            document.querySelector('.search-box').style.transform = 'scale(1.02)';
        });

        searchInput.addEventListener('blur', () => {
            document.querySelector('.search-box').style.transform = 'scale(1)';
            setTimeout(() => {
                document.getElementById('searchSuggestions').classList.add('hidden');
            }, 200);
        });

        // 음성 검색
        document.getElementById('voiceSearch').addEventListener('click', (e) => {
            this.toggleVoiceSearch();
        });

        // 카테고리 카드 클릭
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.addClickEffect(e.currentTarget);
                const category = e.currentTarget.getAttribute('data-category');
                this.showCategoryProducts(category);
            });
        });

        // 하단 네비게이션
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.currentTarget.hasAttribute('data-tab')) return;
                this.switchTab(e.currentTarget);
            });
        });

        // 언어 변경
        document.getElementById('language').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // 터치 이벤트
        this.setupTouchEvents();
    }

    // ===== 바코드 스캔 기능 개선 =====
    
    async startBarcodeCamera() {
        if (this.isScanning) {
            this.stopBarcodeCamera();
            return;
        }
        
        try {
            // 기존 스캐너 완전 정리
            await this.cleanupBarcodeScanner();
            
            // 카메라 권한 먼저 확인
            const permissionStatus = await this.checkCameraPermission();
            if (permissionStatus === 'denied') {
                this.showNotification('카메라 권한이 필요합니다. 브라우저 설정에서 카메라 권한을 허용해주세요.', 'error');
                return;
            }

            // HTML5 QRCode 스캐너 생성
            this.html5QrcodeScanner = new Html5Qrcode("qr-reader");

            // 바코드 스캔 설정 최적화
            const config = {
                fps: 10,
                qrbox: { 
                    width: Math.min(300, window.innerWidth - 40), 
                    height: 200 
                },
                aspectRatio: 1.5,
                disableFlip: false,
                videoConstraints: {
                    width: { min: 640, ideal: 1280, max: 1920 },
                    height: { min: 480, ideal: 720, max: 1080 },
                    facingMode: "environment"
                },
                // 바코드 형식 지원 확장
                formatsToSupport: [
                    Html5QrcodeSupportedFormats.QR_CODE,
                    Html5QrcodeSupportedFormats.CODE_128,
                    Html5QrcodeSupportedFormats.CODE_39,
                    Html5QrcodeSupportedFormats.CODE_93,
                    Html5QrcodeSupportedFormats.CODE_11,
                    Html5QrcodeSupportedFormats.CODABAR,
                    Html5QrcodeSupportedFormats.EAN_13,
                    Html5QrcodeSupportedFormats.EAN_8,
                    Html5QrcodeSupportedFormats.UPC_A,
                    Html5QrcodeSupportedFormats.UPC_E,
                    Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
                    Html5QrcodeSupportedFormats.ITF,
                ]
            };

            // 카메라 제약 조건
            const cameraConstraints = {
                facingMode: { ideal: "environment" }
            };

            // 스캐너 시작
            await this.html5QrcodeScanner.start(
                cameraConstraints,
                config,
                (decodedText, decodedResult) => {
                    console.log(`바코드 스캔 성공: ${decodedText}`);
                    this.onBarcodeScanned(decodedText, decodedResult);
                },
                (errorMessage) => {
                    // 스캔 실패는 조용히 처리 (너무 많은 로그 방지)
                    // console.log(`스캔 실패: ${errorMessage}`);
                }
            );

            this.isScanning = true;
            this.updateBarcodeButton(true);
            this.showNotification('바코드 카메라 스캔을 시작했습니다.', 'success');

            console.log('바코드 스캐너 시작 성공');

        } catch (error) {
            console.error('바코드 카메라 시작 오류:', error);
            this.handleBarcodeError(error);
            this.isScanning = false;
            this.updateBarcodeButton(false);
        }
    }

    // 카메라 권한 확인
    async checkCameraPermission() {
        try {
            // 카메라 스트림 테스트로 권한 확인
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment" } 
            });
            
            // 즉시 스트림 정리
            stream.getTracks().forEach(track => track.stop());
            return 'granted';
            
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                return 'denied';
            } else if (error.name === 'NotFoundError') {
                return 'no-camera';
            }
            return 'unknown';
        }
    }

    // 바코드 스캐너 완전 정리
    async cleanupBarcodeScanner() {
        try {
            if (this.html5QrcodeScanner) {
                // 스캐너가 실행 중이면 중지
                if (this.isScanning) {
                    await this.html5QrcodeScanner.stop();
                }
                // 스캐너 정리
                this.html5QrcodeScanner.clear();
                this.html5QrcodeScanner = null;
            }
            
            // QR Reader 컨테이너 정리
            const qrReaderElement = document.getElementById('qr-reader');
            if (qrReaderElement) {
                qrReaderElement.innerHTML = '<div class="qr-reader-placeholder"><i class="fas fa-camera" style="font-size: 2rem; margin-bottom: 1rem;"></i><p>스캔 시작 버튼을 눌러주세요</p></div>';
            }
            
            this.isScanning = false;
            
            // 약간의 지연 후 완전 정리
            await new Promise(resolve => setTimeout(resolve, 200));
            
        } catch (error) {
            console.warn('바코드 스캐너 정리 중 오류:', error);
            this.isScanning = false;
        }
    }

    // 바코드 스캐너 중지
    async stopBarcodeCamera() {
        try {
            await this.cleanupBarcodeScanner();
            this.updateBarcodeButton(false);
            this.showNotification('바코드 스캔을 중지했습니다.', 'info');
            
        } catch (error) {
            console.error('바코드 카메라 중지 오류:', error);
            this.isScanning = false;
            this.updateBarcodeButton(false);
        }
    }

    // 바코드 스캔 성공 처리
    onBarcodeScanned(decodedText, decodedResult) {
        console.log('바코드 스캔 결과:', decodedText);
        
        // 진동 피드백 (지원되는 경우)
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        
        // 스캔 성공 알림
        this.showNotification(`바코드 감지: ${decodedText}`, 'success');
        
        // 스캔 중지
        this.stopBarcodeCamera();
        
        // 바코드를 기록에 추가
        this.addBarcodeToHistory(decodedText);
        
        // 바코드 분석 시작
        setTimeout(() => {
            this.searchByBarcode(decodedText);
            this.closeBarcodeInput();
        }, 1000);
    }

    // 바코드 에러 처리 개선
    handleBarcodeError(error) {
        let errorMessage = '바코드 스캔 중 오류가 발생했습니다.';
        
        console.error('바코드 스캔 오류:', error);
        
        if (error.name === 'NotAllowedError' || error.message.includes('Permission')) {
            errorMessage = '카메라 권한이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.';
        } else if (error.name === 'NotFoundError' || error.message.includes('NotFoundError')) {
            errorMessage = '카메라를 찾을 수 없습니다. 디바이스에 카메라가 있는지 확인해주세요.';
        } else if (error.name === 'NotReadableError' || error.message.includes('NotReadableError')) {
            errorMessage = '카메라가 다른 앱에서 사용 중입니다. 다른 앱을 종료하고 다시 시도해주세요.';
        } else if (error.message && error.message.includes('Unable to start')) {
            errorMessage = '카메라를 시작할 수 없습니다. 페이지를 새로고침하고 다시 시도해주세요.';
        }
        
        this.showNotification(errorMessage, 'error');
    }

    // 바코드 버튼 상태 업데이트
    updateBarcodeButton(isScanning) {
        const button = document.getElementById('startBarcodeCamera');
        if (button) {
            if (isScanning) {
                button.innerHTML = '<i class="fas fa-stop"></i> 스캔 중지';
                button.classList.add('scanning');
            } else {
                button.innerHTML = '<i class="fas fa-play"></i> 스캔 시작';
                button.classList.remove('scanning');
            }
        }
    }

    // ===== 기존 기능들 =====

    startBarcodeScanner() {
        if (this.isLoading) return;
        
        document.getElementById('barcodeInputSection').classList.remove('hidden');
        this.loadBarcodeHistory();
    }

    closeBarcodeInput() {
        // 스캐너가 실행 중이면 중지
        if (this.isScanning) {
            this.stopBarcodeCamera();
        }
        
        document.getElementById('barcodeInputSection').classList.add('hidden');
    }

    submitBarcodeManual() {
        const barcodeInput = document.getElementById('barcodeManualInput');
        const barcode = barcodeInput.value.trim();
        
        if (barcode.length < 8) {
            this.showNotification('바코드는 최소 8자리 이상이어야 합니다.', 'warning');
            return;
        }
        
        this.addBarcodeToHistory(barcode);
        this.searchByBarcode(barcode);
        barcodeInput.value = '';
        this.closeBarcodeInput();
    }

    searchByBarcode(barcode) {
        this.showNotification(`바코드 ${barcode} 분석 중...`, 'info');
        this.showAdvancedLoading();
        
        setTimeout(() => {
            this.hideLoading();
            const product = this.generateProductByBarcode(barcode);
            this.showResults(product);
        }, 2500);
    }

    generateProductByBarcode(barcode) {
        const barcodeProducts = {
            '8801043032197': {
                name: "허니버터칩",
                nameEn: "Honey Butter Chip",
                barcode: barcode,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZkNzAwIiByeD0iMTYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtd2VpZ2h0PSJib2xkIj7smojsnpAg7ISc64+EPC90ZXh0Pjwvc3ZnPg==",
                price: "₩2,500",
                rating: 4.6,
                reviews: 1857,
                description: "달콤한 꿀과 고소한 버터맛이 만난 대한민국 대표 스낵!",
                tags: ["스낵", "인기상품", "선물추천"],
                category: "과자/스낵",
                nutrition: { calories: "555kcal/100g", fat: "32g", sodium: "500mg", carbs: "58g" }
            },
            '8801043126359': {
                name: "신라면",
                nameEn: "Shin Ramyun",
                barcode: barcode,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGQwMDAwIiByeD0iMTYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtd2VpZ2h0PSJib2xkIj7si6DrnbzrqbQ8L3RleHQ+PC9zdmc+",
                price: "₩900",
                rating: 4.7,
                reviews: 4521,
                description: "매콤하고 얼큰한 맛으로 전 세계인들이 사랑하는 한국의 대표 라면!",
                tags: ["라면", "매운맛", "한국음식"],
                category: "식품",
                nutrition: { calories: "500kcal/120g", fat: "16g", sodium: "1790mg", carbs: "80g" }
            }
        };
        
        return barcodeProducts[barcode] || {
            ...this.generateDemoProduct(),
            barcode: barcode
        };
    }

    addBarcodeToHistory(barcode) {
        const history = JSON.parse(localStorage.getItem('barcodeHistory') || '[]');
        const filteredHistory = history.filter(item => item.barcode !== barcode);
        
        filteredHistory.unshift({
            barcode: barcode,
            timestamp: new Date().toISOString()
        });
        
        if (filteredHistory.length > 10) {
            filteredHistory.splice(10);
        }
        
        localStorage.setItem('barcodeHistory', JSON.stringify(filteredHistory));
    }

    loadBarcodeHistory() {
        const history = JSON.parse(localStorage.getItem('barcodeHistory') || '[]');
        const historyContainer = document.getElementById('barcodeHistory');
        
        if (history.length === 0) {
            historyContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 1rem;">최근 스캔한 바코드가 없습니다.</p>';
            return;
        }
        
        historyContainer.innerHTML = history.map(item => `
            <div class="barcode-item" onclick="app.useBarcodeFromHistory('${item.barcode}')">
                <span class="barcode-number">${item.barcode}</span>
                <span class="barcode-date">${this.formatDate(item.timestamp)}</span>
            </div>
        `).join('');
    }

    useBarcodeFromHistory(barcode) {
        document.getElementById('barcodeManualInput').value = barcode;
        this.submitBarcodeManual();
    }

    switchInputMethod(methodElement) {
        document.querySelectorAll('.input-method').forEach(method => {
            method.classList.remove('active');
        });
        
        methodElement.classList.add('active');
    }

    setupVoiceSearch() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = this.getLanguageCode(this.currentLanguage);

            this.recognition.onstart = () => {
                document.getElementById('voiceSearch').classList.add('recording');
                this.showNotification(this.translations[this.currentLanguage].recognizing || '음성 인식을 시작합니다...', 'info');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('searchInput').value = transcript;
                this.handleSearch(transcript);
                this.showNotification(`"${transcript}" 검색 중...`, 'success');
            };

            this.recognition.onerror = () => {
                this.showNotification('음성 인식에 실패했습니다.', 'error');
            };

            this.recognition.onend = () => {
                document.getElementById('voiceSearch').classList.remove('recording');
            };
        } else {
            document.getElementById('voiceSearch').style.display = 'none';
        }
    }

    toggleVoiceSearch() {
        if (this.recognition) {
            if (document.getElementById('voiceSearch').classList.contains('recording')) {
                this.recognition.stop();
            } else {
                this.recognition.start();
            }
        }
    }

    getLanguageCode(lang) {
        const codes = {
            ko: 'ko-KR',
            en: 'en-US',
            zh: 'zh-CN',
            ja: 'ja-JP'
        };
        return codes[lang] || 'ko-KR';
    }

    handleSearch(query) {
        if (query.length < 2) {
            document.getElementById('searchSuggestions').classList.add('hidden');
            return;
        }

        const suggestions = this.generateSearchSuggestions(query);
        this.showSearchSuggestions(suggestions);
    }

    generateSearchSuggestions(query) {
        const commonProducts = [
            { name: '허니버터칩', icon: 'cookie-bite' },
            { name: '신라면', icon: 'utensils' },
            { name: '불닭볶음면', icon: 'fire' },
            { name: '마스크팩', icon: 'spa' },
            { name: '김치', icon: 'leaf' },
            { name: '한복', icon: 'tshirt' }
        ];

        return commonProducts
            .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 4);
    }

    showSearchSuggestions(suggestions) {
        const container = document.getElementById('searchSuggestions');
        
        if (suggestions.length === 0) {
            container.classList.add('hidden');
            return;
        }

        container.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" data-query="${suggestion.name}">
                <i class="fas fa-${suggestion.icon}"></i>
                <span>${suggestion.name}</span>
            </div>
        `).join('');

        container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const query = e.currentTarget.getAttribute('data-query');
                document.getElementById('searchInput').value = query;
                this.performSearch(query);
                container.classList.add('hidden');
            });
        });

        container.classList.remove('hidden');
    }

    performSearch(query) {
        this.showNotification(`"${query}" 검색 중...`, 'info');
        this.showAdvancedLoading();

        setTimeout(() => {
            this.hideLoading();
            this.showResults(this.generateDemoProduct());
        }, 2000);
    }

    showCategoryProducts(category) {
        const categoryNames = {
            snacks: '과자/스낵',
            fashion: '의류',
            beauty: '화장품', 
            food: '식품'
        };
        
        const categoryName = categoryNames[category] || category;
        this.showCategoryModal(category, categoryName);
    }

    showCategoryModal(category, categoryName) {
        const lang = this.translations[this.currentLanguage];
        
        const existingModal = document.getElementById('categoryModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'categoryModal';
        modal.className = 'category-modal';
        
        const categoryProducts = this.getCategoryProducts(category);
        const categoryIcons = {
            snacks: 'cookie-bite',
            fashion: 'tshirt',
            beauty: 'spa',
            food: 'utensils'
        };
        
        modal.innerHTML = `
            <div class="category-modal-content category-${category}">
                <div class="category-modal-header">
                    <h3>
                        <i class="fas fa-${categoryIcons[category] || 'list'}"></i>
                        ${categoryName}
                    </h3>
                    <button class="close-category-modal" onclick="app.closeCategoryModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="category-modal-body">
                    <div class="category-description">
                        <h4>${categoryName} 카테고리</h4>
                        <p>${lang.categoryExplore || '이 카테고리의 인기 상품들을 확인해보세요.'}</p>
                    </div>
                    
                    ${categoryProducts.length > 0 ? `
                        <div class="category-products-list">
                            ${categoryProducts.map((product, index) => `
                                <div class="category-product-item" onclick="app.showProductFromCategory('${product.name}')" style="animation-delay: ${index * 0.1}s">
                                    <div class="category-product-icon" style="background: ${product.color}">
                                        ${product.name.charAt(0)}
                                    </div>
                                    <div class="category-product-info">
                                        <div class="category-product-name">${product.name}</div>
                                        <div class="category-product-desc">${product.description}</div>
                                        <div class="category-product-price">${product.price}</div>
                                        ${product.rating ? `
                                            <div class="category-product-rating">
                                                <div class="stars">${this.generateStars(product.rating)}</div>
                                                <span>(${product.reviews || 0} 리뷰)</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="category-empty-state">
                            <i class="fas fa-box-open"></i>
                            <h4>상품 준비 중</h4>
                            <p>이 카테고리의 상품들을 준비하고 있습니다.</p>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeCategoryModal();
            }
        });
    }

    closeCategoryModal() {
        const modal = document.getElementById('categoryModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    showProductFromCategory(productName) {
        this.showNotification(`${productName} 상세 정보 로딩 중...`, 'info');
        this.closeCategoryModal();
        
        setTimeout(() => {
            this.showAdvancedLoading();
            setTimeout(() => {
                this.hideLoading();
                this.showResults(this.generateDemoProduct());
            }, 1500);
        }, 300);
    }

    getCategoryProducts(category) {
        const products = {
            snacks: [
                { 
                    name: '허니버터칩', 
                    description: '달콤한 꿀맛 감자칩', 
                    price: '₩2,500', 
                    color: '#ffd700',
                    rating: 4.6,
                    reviews: 1857
                },
                { 
                    name: '새우깡', 
                    description: '바삭한 새우맛 스낵', 
                    price: '₩1,800', 
                    color: '#ff6b6b',
                    rating: 4.4,
                    reviews: 923
                },
                { 
                    name: '초코파이', 
                    description: '부드러운 마시멜로 과자', 
                    price: '₩3,200', 
                    color: '#8b5cf6',
                    rating: 4.5,
                    reviews: 1234
                },
                { 
                    name: '포키', 
                    description: '초콜릿 과자 스틱', 
                    price: '₩2,200', 
                    color: '#8b4513',
                    rating: 4.3,
                    reviews: 756
                },
                { 
                    name: '칸쵸', 
                    description: '비스킷 속 초콜릿', 
                    price: '₩1,900', 
                    color: '#d2691e',
                    rating: 4.2,
                    reviews: 634
                }
            ],
            fashion: [
                { 
                    name: '한복', 
                    description: '전통 한국 의상', 
                    price: '₩150,000', 
                    color: '#4ecdc4',
                    rating: 4.8,
                    reviews: 234
                },
                { 
                    name: 'K-패션 셔츠', 
                    description: '모던한 디자인 셔츠', 
                    price: '₩45,000', 
                    color: '#6366f1',
                    rating: 4.5,
                    reviews: 456
                },
                { 
                    name: '스트릿 패션', 
                    description: '캐주얼한 스타일', 
                    price: '₩35,000', 
                    color: '#f59e0b',
                    rating: 4.3,
                    reviews: 321
                },
                { 
                    name: '한국 브랜드 후디', 
                    description: '편안한 후드 티셔츠', 
                    price: '₩55,000', 
                    color: '#8b5cf6',
                    rating: 4.6,
                    reviews: 567
                }
            ],
            beauty: [
                { 
                    name: '마스크팩', 
                    description: '보습 효과 마스크', 
                    price: '₩15,000', 
                    color: '#10b981',
                    rating: 4.7,
                    reviews: 1245
                },
                { 
                    name: 'BB크림', 
                    description: '자연스러운 커버력', 
                    price: '₩25,000', 
                    color: '#ef4444',
                    rating: 4.4,
                    reviews: 892
                },
                { 
                    name: '립틴트', 
                    description: '오래가는 틴트', 
                    price: '₩18,000', 
                    color: '#8b5cf6',
                    rating: 4.5,
                    reviews: 678
                },
                { 
                    name: '에센스', 
                    description: '피부 영양 공급', 
                    price: '₩32,000', 
                    color: '#20b2aa',
                    rating: 4.6,
                    reviews: 543
                }
            ],
            food: [
                { 
                    name: '김치', 
                    description: '전통 발효 음식', 
                    price: '₩8,000', 
                    color: '#ef4444',
                    rating: 4.8,
                    reviews: 2134
                },
                { 
                    name: '라면', 
                    description: '인스턴트 국수', 
                    price: '₩1,200', 
                    color: '#f59e0b',
                    rating: 4.5,
                    reviews: 3456
                },
                { 
                    name: '고추장', 
                    description: '매운 조미료', 
                    price: '₩6,500', 
                    color: '#dc2626',
                    rating: 4.6,
                    reviews: 876
                },
                { 
                    name: '참기름', 
                    description: '고소한 참깨 오일', 
                    price: '₩12,000', 
                    color: '#daa520',
                    rating: 4.7,
                    reviews: 654
                }
            ]
        };
        
        return products[category] || [];
    }

    showFavorites() {
        const lang = this.translations[this.currentLanguage];
        
        const existingModal = document.getElementById('favoritesModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'favoritesModal';
        modal.className = 'favorites-section';
        
        modal.innerHTML = `
            <div class="favorites-content">
                <div class="favorites-header">
                    <h3>
                        <i class="fas fa-heart"></i>
                        ${lang.favoritesTitle}
                    </h3>
                    <button class="close-favorites" onclick="app.closeFavorites()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="favorites-body">
                    ${this.favorites.length > 0 ? `
                        <div class="favorites-list">
                            ${this.favorites.map((item, index) => `
                                <div class="favorite-item" style="animation-delay: ${index * 0.1}s" onclick="app.showFavoriteProduct('${item.name}')">
                                    <div class="favorite-icon">
                                        ${item.name.charAt(0)}
                                    </div>
                                    <div class="favorite-info">
                                        <div class="favorite-name">${item.name}</div>
                                        <div class="favorite-date">${this.formatDate(item.timestamp)}</div>
                                    </div>
                                    <button class="remove-favorite" onclick="app.removeFromFavorites('${item.name}', event)" title="${lang.removeFavorite}">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="favorites-empty">
                            <i class="fas fa-heart-broken"></i>
                            <h4>${lang.noFavorites}</h4>
                            <p>${lang.startFavoriting}</p>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeFavorites();
            }
        });
    }

    closeFavorites() {
        const modal = document.getElementById('favoritesModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    showFavoriteProduct(productName) {
        const favoriteProduct = this.generateDemoProduct();
        favoriteProduct.name = productName;
        
        this.closeFavorites();
        
        setTimeout(() => {
            this.showAdvancedLoading();
            setTimeout(() => {
                this.hideLoading();
                this.showResults(favoriteProduct);
            }, 1500);
        }, 300);
    }

    removeFromFavorites(productName, event) {
        event.stopPropagation();
        
        this.favorites = this.favorites.filter(item => item.name !== productName);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        
        this.updateFavoriteCount();
        this.showNotification(`${productName}을(를) 찜 목록에서 제거했습니다.`, 'info');
        
        this.showFavorites();
    }

    addToFavorites(productName) {
        const existingIndex = this.favorites.findIndex(item => item.name === productName);
        
        if (existingIndex === -1) {
            const currentProduct = this.getCurrentProduct();
            
            this.favorites.push({
                name: productName,
                timestamp: new Date().toISOString(),
                ...currentProduct
            });
            
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            this.showNotification(`${productName}을(를) 찜 목록에 추가했습니다!`, 'success');
            
            this.showHeartAnimation();
        } else {
            this.showNotification(`${productName}은(는) 이미 찜 목록에 있습니다!`, 'info');
        }
        
        this.updateFavoriteCount();
    }

    getCurrentProduct() {
        return {
            category: "스낵",
            price: "₩2,500",
            rating: 4.6,
            image: "data:image/svg+xml;base64,..."
        };
    }

    showHeartAnimation() {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            font-size: 3rem;
            color: #E91E63;
            z-index: 9999;
            pointer-events: none;
            animation: heartBurst 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 800);
    }

    addClickEffect(element, type = 'default') {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        
        if (type === 'capture') {
            ripple.style.background = 'rgba(0, 102, 204, 0.3)';
            ripple.style.width = '120px';
            ripple.style.height = '120px';
        } else {
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.width = '40px';
            ripple.style.height = '40px';
        }
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = rect.width / 2 - 20 + 'px';
        ripple.style.top = rect.height / 2 - 20 + 'px';
        
        element.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            ripple.remove();
        };

        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }

    setupTouchEvents() {
        document.querySelectorAll('.scan-button, .category-card, .history-item').forEach(element => {
            element.addEventListener('touchstart', (e) => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    async startCamera() {
        if (this.isLoading) return;
        
        try {
            this.isLoading = true;
            this.showMiniLoading(this.translations[this.currentLanguage].recognizing || '카메라를 시작하는 중...');
            
            const constraints = {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            this.currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video = document.getElementById('video');
            this.canvas = document.getElementById('canvas');
            
            this.video.srcObject = this.currentStream;
            
            const cameraSection = document.getElementById('cameraSection');
            cameraSection.classList.remove('hidden');
            cameraSection.style.opacity = '0';
            cameraSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cameraSection.style.transition = 'all 0.4s ease-out';
                cameraSection.style.opacity = '1';
                cameraSection.style.transform = 'translateY(0)';
            }, 50);
            
            this.hideMiniLoading();
            this.isLoading = false;
            
        } catch (error) {
            console.error('카메라 접근 오류:', error);
            this.showErrorMessage('카메라에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.');
            this.isLoading = false;
        }
    }

    stopCamera() {
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
            this.currentStream = null;
        }
        
        const cameraSection = document.getElementById('cameraSection');
        cameraSection.style.transition = 'all 0.3s ease-in';
        cameraSection.style.opacity = '0';
        cameraSection.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            cameraSection.classList.add('hidden');
            cameraSection.style.transform = 'translateY(20px)';
        }, 300);
    }

    capturePhoto() {
        if (!this.video || !this.canvas || this.isLoading) return;

        this.showCaptureFlash();

        const context = this.canvas.getContext('2d');
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        
        context.drawImage(this.video, 0, 0);
        
        const imageData = this.canvas.toDataURL('image/jpeg', 0.8);
        
        this.stopCamera();
        setTimeout(() => {
            this.analyzeImage(imageData);
        }, 500);
    }

    showCaptureFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(flash);
        
        flash.animate([
            { opacity: 0 },
            { opacity: 0.9 },
            { opacity: 0 }
        ], {
            duration: 200,
            easing: 'ease-out'
        }).onfinish = () => {
            flash.remove();
        };
    }

    async analyzeImage(imageData) {
        if (this.isLoading) return;
        
        this.showAdvancedLoading();
        
        try {
            const loadingTexts = [
                this.translations[this.currentLanguage].recognizing || '상품을 인식하고 있어요...',
                '데이터베이스에서 정보를 찾고 있어요...',
                '리뷰와 평점을 수집하고 있어요...',
                '분석 결과를 준비하고 있어요...'
            ];
            
            for (let i = 0; i < loadingTexts.length; i++) {
                setTimeout(() => {
                    this.updateLoadingText(loadingTexts[i]);
                }, i * 900);
            }
            
            setTimeout(() => {
                this.hideLoading();
                this.showResults(this.generateDemoProduct());
            }, 4000);
            
        } catch (error) {
            console.error('이미지 분석 오류:', error);
            this.hideLoading();
            this.showErrorMessage('이미지 분석 중 오류가 발생했습니다.');
        }
    }

    generateDemoProduct() {
        const demoProducts = [
            {
                name: "허니버터칩",
                nameEn: "Honey Butter Chip",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZkNzAwIiByeD0iMTYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtd2VpZ2h0PSJib2xkIj7smojsnpAg7ISc64+EPC90ZXh0Pjwvc3ZnPg==",
                price: "₩2,500",
                rating: 4.6,
                reviews: 1857,
                description: "달콤한 꿀과 고소한 버터맛이 만난 대한민국 대표 스낵! 바삭한 감자칩에 특별한 허니버터 시즈닝을 입혀 중독적인 맛을 자랑합니다.",
                tags: ["스낵", "인기상품", "선물추천", "한국대표", "달콤함"],
                category: "과자/스낵",
                nutrition: { calories: "555kcal/100g", fat: "32g", sodium: "500mg", carbs: "58g" }
            },
            {
                name: "신라면",
                nameEn: "Shin Ramyun",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGQwMDAwIiByeD0iMTYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtd2VpZ2h0PSJib2xkIj7si6DrnbzrqbQ8L3RleHQ+PC9zdmc+",
                price: "₩900",
                rating: 4.7,
                reviews: 4521,
                description: "매콤하고 얼큰한 맛으로 전 세계인들이 사랑하는 한국의 대표 인스턴트 라면입니다. 1986년 출시 이래 한국인의 소울푸드로 자리잡았습니다.",
                tags: ["라면", "매운맛", "한국음식", "간편식", "인기"],
                category: "식품",
                nutrition: { calories: "500kcal/120g", fat: "16g", sodium: "1790mg", carbs: "80g" }
            }
        ];

        return demoProducts[Math.floor(Math.random() * demoProducts.length)];
    }

    showResults(product) {
        const resultContent = document.getElementById('resultContent');
        const lang = this.translations[this.currentLanguage];
        
        resultContent.innerHTML = `
            <div class="product-info">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 1.5rem; font-style: italic;">${product.nameEn}</p>
                
                <div class="product-rating">
                    <div class="stars">${this.generateStars(product.rating)}</div>
                    <span style="font-weight: 600;">${product.rating} (${product.reviews.toLocaleString()} 리뷰)</span>
                </div>
                
                <div class="product-price">${product.price}</div>
                
                <div class="product-description">
                    <h4 style="margin-bottom: 0.75rem; color: var(--text-primary); font-size: 1.1rem;">${lang.productDesc}</h4>
                    <p>${product.description}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.75rem; color: var(--text-primary); font-size: 1.1rem;">${lang.nutritionInfo}</h4>
                    <div style="background: var(--background-light); padding: 1rem; border-radius: var(--border-radius-sm); font-size: 0.95rem; border: 1px solid var(--border-color);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                            <p><strong>${lang.calories}</strong> ${product.nutrition.calories}</p>
                            <p><strong>${lang.fat}</strong> ${product.nutrition.fat}</p>
                            <p><strong>${lang.sodium}</strong> ${product.nutrition.sodium}</p>
                            <p><strong>${lang.carbs}</strong> ${product.nutrition.carbs}</p>
                        </div>
                    </div>
                </div>
                
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                
                <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <button class="action-btn primary" onclick="app.addToFavorites('${product.name}')">
                        <i class="fas fa-heart"></i> ${lang.addFavorites}
                    </button>
                    <button class="action-btn secondary" onclick="app.shareProduct('${product.name}')">
                        <i class="fas fa-share"></i> ${lang.share}
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('resultsSection').classList.remove('hidden');
        
        const resultCard = document.querySelector('.result-card');
        resultCard.style.transform = 'scale(0.9) translateY(40px)';
        resultCard.style.opacity = '0';
        
        setTimeout(() => {
            resultCard.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            resultCard.style.transform = 'scale(1) translateY(0)';
            resultCard.style.opacity = '1';
        }, 100);
        
        this.addToHistory(product);
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    closeResults() {
        const resultCard = document.querySelector('.result-card');
        resultCard.style.transition = 'all 0.3s ease-in';
        resultCard.style.transform = 'scale(0.9) translateY(30px)';
        resultCard.style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('resultsSection').classList.add('hidden');
        }, 300);
    }

    addToHistory(product) {
        const historyItem = {
            ...product,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        
        this.scanHistory = this.scanHistory.filter(item => item.name !== product.name);
        this.scanHistory.unshift(historyItem);
        
        if (this.scanHistory.length > 10) {
            this.scanHistory = this.scanHistory.slice(0, 10);
        }
        
        localStorage.setItem('scanHistory', JSON.stringify(this.scanHistory));
        this.loadScanHistory();
    }

    loadScanHistory() {
        const historyList = document.getElementById('historyList');
        const lang = this.translations[this.currentLanguage];
        
        if (this.scanHistory.length === 0) {
            historyList.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
                    <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">${lang.noScans}</p>
                    <p style="font-size: 0.9rem;">${lang.scanProduct}</p>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = this.scanHistory.map((item, index) => `
            <div class="history-item fade-in-up" style="animation-delay: ${index * 0.1}s" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="history-info">
                    <h4>${item.name}</h4>
                    <p>${this.formatDate(item.timestamp)} • ${item.category}</p>
                </div>
                <div style="margin-left: auto; color: var(--primary-color);">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `).join('');
        
        historyList.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.addClickEffect(e.currentTarget);
                const id = parseInt(e.currentTarget.dataset.id);
                const product = this.scanHistory.find(p => p.id === id);
                if (product) {
                    setTimeout(() => this.showResults(product), 200);
                }
            });
        });
    }

    loadFavorites() {
        this.updateFavoriteCount();
    }

    updateFavoriteCount() {
        const notificationDot = document.querySelector('.notification-dot');
        if (notificationDot) {
            const count = this.favorites.length;
            if (count > 0) {
                notificationDot.textContent = count > 99 ? '99+' : count;
                notificationDot.classList.remove('hidden');
            } else {
                notificationDot.classList.add('hidden');
            }
        }
    }

    shareProduct(productName) {
        if (navigator.share) {
            navigator.share({
                title: 'Koko',
                text: `${productName} - Koko에서 발견한 한국 상품!`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(`${productName} - Koko에서 발견한 한국 상품! ${window.location.href}`).then(() => {
                this.showNotification('상품 정보가 클립보드에 복사되었습니다!', 'success');
            });
        }
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        
        if (diffHours < 1) return '방금 전';
        if (diffHours < 24) return `${diffHours}시간 전`;
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}일 전`;
        
        return date.toLocaleDateString('ko-KR', {
            month: 'short',
            day: 'numeric'
        });
    }

    switchTab(tabElement) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        tabElement.classList.add('active');
        
        const icon = tabElement.querySelector('.nav-icon');
        icon.style.transform = tabElement.classList.contains('camera-nav') ? 'scale(1.15)' : 'scale(1.1)';
        setTimeout(() => {
            icon.style.transform = tabElement.classList.contains('camera-nav') ? 'scale(1.05)' : 'scale(1)';
        }, 200);
        
        const tab = tabElement.getAttribute('data-tab');
        if (tab === 'favorites') {
            this.showFavorites();
        }
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('language', language);
        
        this.updateLanguage();
        this.showNotification(`언어를 ${language}로 변경했습니다.`, 'success');
    }

    updateLanguage() {
        const lang = this.translations[this.currentLanguage];
        
        const searchInput = document.getElementById('searchInput');
        searchInput.placeholder = lang.searchPlaceholder;
        
        document.querySelectorAll('[data-text-ko]').forEach(element => {
            const key = `data-text-${this.currentLanguage}`;
            if (element.hasAttribute(key)) {
                const text = element.getAttribute(key);
                if (element.tagName === 'INPUT') {
                    element.placeholder = text;
                } else {
                    element.innerHTML = text;
                }
            }
        });

        if (this.recognition) {
            this.recognition.lang = this.getLanguageCode(this.currentLanguage);
        }
    }

    setupLanguage() {
        const browserLang = navigator.language.split('-')[0];
        const supportedLangs = ['ko', 'en', 'zh', 'ja'];
        
        if (supportedLangs.includes(browserLang) && !localStorage.getItem('language')) {
            this.currentLanguage = browserLang;
            document.getElementById('language').value = browserLang;
        } else {
            document.getElementById('language').value = this.currentLanguage;
        }
        
        this.updateLanguage();
    }

    switchCamera() {
        this.showNotification('카메라를 전환하고 있습니다...', 'info');
        
        if (this.currentStream) {
            this.stopCamera();
            setTimeout(() => {
                this.startCamera();
            }, 500);
        }
    }

    showMiniLoading(text) {
        const existing = document.getElementById('miniLoader');
        if (existing) existing.remove();

        const miniLoader = document.createElement('div');
        miniLoader.id = 'miniLoader';
        miniLoader.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                z-index: 1000;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
            ">
                <i class="fas fa-spinner fa-spin" style="font-size: 1.1rem;"></i>
                ${text}
            </div>
        `;
        document.body.appendChild(miniLoader);
    }

    hideMiniLoading() {
        const miniLoader = document.getElementById('miniLoader');
        if (miniLoader) {
            miniLoader.style.opacity = '0';
            setTimeout(() => miniLoader.remove(), 300);
        }
    }

    showAdvancedLoading() {
        this.isLoading = true;
        document.getElementById('loadingOverlay').classList.remove('hidden');
        
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = '0%';
        progressBar.style.transition = 'none';
        
        setTimeout(() => {
            progressBar.style.transition = 'width 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            progressBar.style.width = '100%';
        }, 100);
    }

    updateLoadingText(text) {
        const loadingText = document.getElementById('loadingText');
        if (loadingText) {
            loadingText.style.opacity = '0';
            loadingText.style.transform = 'translateY(10px)';
            setTimeout(() => {
                loadingText.textContent = text;
                loadingText.style.opacity = '1';
                loadingText.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    hideLoading() {
        this.isLoading = false;
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.style.opacity = '1';
        }, 400);
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #FF5722;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                z-index: 1001;
                font-size: 0.95rem;
                max-width: 90%;
                text-align: center;
                box-shadow: 0 10px 25px rgba(255, 87, 34, 0.3);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                animation: slideDown 0.4s ease-out;
            ">
                <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            const errorElement = errorDiv.firstElementChild;
            errorElement.style.animation = 'slideUp 0.4s ease-in forwards';
            setTimeout(() => errorDiv.remove(), 400);
        }, 3500);
    }

    showNotification(message, type = 'info') {
        const existing = document.querySelectorAll('.notification');
        existing.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const bgColor = {
            'success': '#10b981',
            'error': '#FF5722',
            'info': '#0066CC',
            'warning': '#f59e0b'
        };
        
        const iconMap = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'info': 'info-circle',
            'warning': 'exclamation-triangle'
        };
        
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${bgColor[type]};
                color: white;
                padding: 1rem 1.25rem;
                border-radius: 12px;
                z-index: 1001;
                font-size: 0.9rem;
                font-weight: 500;
                max-width: 320px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                transform: translateX(400px);
                transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                display: flex;
                align-items: center;
                gap: 0.75rem;
            ">
                <i class="fas fa-${iconMap[type]}" style="font-size: 1.1rem;"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.firstElementChild.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            const notifElement = notification.firstElementChild;
            notifElement.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 400);
        }, 3500);
    }
}

// 앱 초기화
let app;

// HTML5 QRCode 라이브러리 로드 확인 후 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Html5Qrcode === 'undefined') {
        console.error('HTML5 QRCode 라이브러리가 로드되지 않았습니다.');
        
        // 동적으로 스크립트 로드 시도
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
        script.onload = () => {
            console.log('HTML5 QRCode 라이브러리 동적 로드 완료');
            app = new KokoApp();
        };
        script.onerror = () => {
            console.error('HTML5 QRCode 라이브러리 로드 실패');
            // 라이브러리 없이도 앱 실행 (바코드 기능 제외)
            app = new KokoApp();
        };
        document.head.appendChild(script);
    } else {
        console.log('HTML5 QRCode 라이브러리 로드 확인');
        app = new KokoApp();
    }
});

// PWA 지원
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// 전역 에러 핸들링
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// 앱이 포그라운드로 돌아올 때 처리
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.app) {
        if (window.app.isScanning && window.app.html5QrcodeScanner) {
            console.log('앱이 포그라운드로 복귀, 바코드 스캐너 재시작');
            setTimeout(() => {
                window.app.startBarcodeCamera();
            }, 500);
        }
    }
});

console.log('🚀 Koko 앱 JavaScript 로드 완료');

