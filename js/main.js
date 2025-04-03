// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 页面加载完成后隐藏加载动画
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('hidden');
            // 加载完成后删除preloader元素以释放内存
            setTimeout(function() {
                preloader.remove();
            }, 500);
        }, 1500); // 给予1.5秒的加载动画时间
    }
    
    // 移动导航菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const toolCards = document.querySelectorAll('.tool-card');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            toolCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        toolCards.forEach(card => {
            const title = card.querySelector('.tool-title').textContent.toLowerCase();
            const description = card.querySelector('.tool-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // 详情按钮点击事件
    const infoBtns = document.querySelectorAll('.info-btn');
    
    infoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const toolName = this.getAttribute('data-tool');
            alert(`${toolName} 的更多详情即将推出，敬请期待！`);
        });
    });
    
    // 平滑滚动效果
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是外部链接，不阻止默认行为
            if (this.getAttribute('href').startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 在移动设备上，点击后关闭菜单
                if (window.innerWidth < 768) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    // 工具卡片动画效果
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function checkCards() {
        toolCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }
    
    // 初始检查
    checkCards();
    
    // 滚动时检查
    window.addEventListener('scroll', checkCards);
    
    // 下载统计
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolName = this.closest('.tool-card').querySelector('.tool-title').textContent;
            console.log('工具下载：', toolName);
            // 这里可以添加下载统计的代码，例如使用Google Analytics或自定义API
        });
    });
}); 