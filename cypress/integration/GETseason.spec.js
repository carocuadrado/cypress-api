describe('Players api', () => {
    context('GET /Season', () => {
        it('Should return a data season', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/season_averages'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)
                    assert.isArray(response.body.data, 'Todos Response is an array')


                });
        });


        it('Search a specific player using season ', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=237',

            })
                .should((response) => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body.data))
                    expect(response.body.data[0].season).to.eq(2021)
                    expect(response.body.data[0].turnover).to.eq(3.25)


                });
        });

    });

});