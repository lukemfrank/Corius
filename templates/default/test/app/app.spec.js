describe('nav', function() {
  it('has a home link', function() {
    var homeAnchor = document.getElementsByTagName('a')[0];
    it('should have a root level href value', function () {
      expect(homeAnchor.attributes[0]).toEqual('/');
    });
  });
});