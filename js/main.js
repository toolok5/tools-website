// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动效果
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // 显示下载统计（示例功能）
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 在实际应用中，这里可以发送下载统计数据到服务器
            console.log('工具下载：', this.getAttribute('href'));
        });
    });
    
    // 工具卡片动画效果
    const toolCards = document.querySelectorAll('.tool-card');
    
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
}); 