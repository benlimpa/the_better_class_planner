
function handleBtn()
{
    $.get("/scrape/" + $("#search_text").val(), function(data) {
        console.log($("#search_text").text());
        console.log(data);
        }
    );
}
