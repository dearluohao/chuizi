define(['jquery'], () => {
    class Footer {
      constructor () {
        this.init()
      }
      init () {
        $('footer').load('/html/modules/footer.html')
      }
     
    }
    return new Footer()
  })
  