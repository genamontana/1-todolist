describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-additemform--add-item-form-story&viewMode=story')
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot()
    })
})
