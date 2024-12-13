<script>
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menuCentral ul');
  const items = document.querySelectorAll('.menuCentral li');
  
  if (window.innerWidth >= 768) {
    let currentIndex = 0;
    
    function scrollToIndex(index) {
      menu.scrollLeft = items[index].offsetLeft;
    }
    
    function updateCarousel() {
      const viewportWidth = menu.clientWidth;
      const totalWidth = menu.scrollWidth;
      
      if (totalWidth > viewportWidth) {
        currentIndex = (currentIndex + 1) % items.length;
        scrollToIndex(currentIndex);
      }
    }
    
    setInterval(updateCarousel, 3000); // Ajuste o intervalo conforme necessário
  }
});
</script>
