$("div.button").click( function (e)
{
    // Open the modal
    if(!$("div.modal").is(':visible'))
    {
        $("div.modal").show(100);
        $("div.modalContent").delay(150).show(400);
    }
});

$("div.modal").click( function ()
{
    // Close the modal
    if($("div.modal").is(':visible'))
    {
        $("div.modal").delay(200).hide(100);
        $("div.modalContent").hide(200);
    }
});

$("div.modalContent").click( function (e)
{
    // If you put the modal content inside modal background you need to
    // stop propagation of the click event so that clicking inside
    // the modal content doesn't close the modal
    
    // Prevent click event to bubble up to div.modal
    //e.stopPropagation();
});
