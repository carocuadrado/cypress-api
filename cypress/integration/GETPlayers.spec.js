describe('Products api', () => {
    context('GET /players', () => {
        it('should return a list with all players', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/players'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)
                    expect(response.body.data.length).to.be.eq(25);
                    expect(response.body.meta).to.have.all.keys(
                      'total_pages', 'current_page', 'next_page', 'per_page', 'total_count'
                    )
                });
        });
    });
});