$(document).ready(function(){

    var i = 0

    const data = {
        plan: null,
        period: "Monthly",
        addons: [],
    }

    const check = $('#check')

    check.change(function(){
        // console.log('changed')
        if(check.is(":checked")){
            $('.plans').removeClass('monthly')
            $('.plans').addClass("yearly")
            $('.period').removeClass('monthly')
            $('.period').addClass("yearly")
            $('.choice .price').removeClass('monthly')
            $('.choice .price').addClass('yearly')
            data.period = "Yearly"
        } else {
            $('.plans').removeClass('yearly')
            $('.plans').addClass("monthly")
            $('.period').removeClass('yearly')
            $('.period').addClass("monthly")
            $('.choice .price').removeClass('yearly')
            $('.choice .price').addClass('monthly')
            data.period = 'Monthly'
        }
    })

    // Vallidation

    $("#signUp").validate({
        rules: {
            name: {
                minlength: 2
            },
            email: {
                email: true
            },
            tel: {
                number: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Name must be at least 2 characters"
            },
            email: {
                required: "Please enter a valid email address",
            },
            tel: {
                required: "Please enter your phone number",
                minlength: "Number must be at least 10 characters"
            }
        },

    });

    $('#plansform').validate({
        rules: {
            plan: {
                required: true,
            }
        },
        messages: {
            plan: {
                required: "You must select a plan"
            }
        }
    })


    $('#addons').validate({
        rules: {
            choice: {
                required: true,
            }
        },
        messages: {
            choice: {
                required: "You must select an addon"
            }
        }
    })

    //Event listeners

       $('#signUp').on("submit", function(e){
        e.preventDefault();
       })

       $('#plansform').submit(function(e){
        e.preventDefault();
       })

       $('#addons').submit(function(e){
        e.preventDefault();
       })

       $(".next").on('click', function(){
        $('#signUp').submit()
        if($('#signUp').valid()){
            // console.log(i)
            if (i >= 4){
                i = 0
            }

            else{
                i++
            }

            // console.log(i)
            switchHandler(i)

        }
        else{
            // console.log('invalid')
        }   
    })

    $('.back').click(function(){
        // console.log(i)
        if (i <= 0){
            i = 0
        }
        else{
            i--
        }
        // console.log(i)
        switchHandler(i)
    })

    // This changes the style of a plan when clicked and keeps the data in a variable

    $('.plans .choice').click(function(){
        // console.log('clicked', $(this).index())
        $('.plans .choice').removeClass('selected')
        $(this).addClass('selected')
        data.plan = $(this).index()
        // console.log(data)
    })

    $('.addons input[type="checkbox"]').on('change', function(){
        //$(this).toggleClass('selected')
        if($(this).is(':checked')){
            // console.log('checked')
            $(this).parent().addClass("selected")
        }
        else{
            // console.log('Not checked')
            $(this).parent().removeClass("selected")
        }
        
    })
    

    //Handler Functions


    // Handle Sidebar active icon

    function switchHandler(i){
        // console.log(i)

        sidebarHandler(i)
        headerHandler(i)
        stepHandler(i)
        buttonDisplayedHandler(i)
        setNextListener(i)
    }

    function sidebarHandler(i){
        // console.log($('.sidebar li'))
        $(".sidebar li").removeClass("active")
        $(`.sidebar li:eq(${i})`).addClass('active')
    }

    // Handle the header info

    function headerHandler(i){
        $(".container .header").removeClass("active")
        $(`.container .header:eq(${i})`).addClass('active')
    }

    // Handle the step displayed currently

    function stepHandler(i){
        $(".container .step").removeClass("active")
        $(`.container .step:eq(${i})`).addClass('active')
    }

    // Set buttons active

    function buttonDisplayedHandler(i){
        if (i == 0){
            $('.back').addClass('none')
        }
        if (i > 0){
            $('.back').removeClass('none')
        }
        if (i == 4){
            $('.back').addClass('none')
            $('.next').addClass('none')
        }
    }

    // Set listeners for next buttons

    function setNextListener(){

        switch (i){
            case 0: 
                $('.next').off('click')
                $(".next").on('click', function(){
                    $('#signUp').submit()
                    if($('#signUp').valid()){
                        if (i >= 4){
                            i = 0
                        }
            
                        else{
                            i++
                        }
            
                        // console.log(i)
                        switchHandler(i)
                    }
                    else{
                        // console.log('invalid')
                    }   
                })
            break;
            case 1:
                $('.next').off('click')
                $(".next").on('click', function(){
                    $('#plansform').submit()
                    if($('#plansform').valid()){
                        // console.log('yes', $('#plansform').serializeArray())
                        i++
                        switchHandler(i)
                    }
                })
            break;
            case 2:
                $('.next').html('Next Step')
                if($('.next').hasClass('confirm')){
                    $('.next').removeClass('confirm')
                } 
                $('.next').off('click')
                $('.next').on('click', function(){
                    let addons = []
                    $('#addons').submit()
                    if($('#addons').valid()){
                        $(this).addClass('confirm')
                        $(this).html('Confirm')
                        $(".addons .choice.selected").each(function(){
                            addons.push($(this).index())
                        })
                        // console.log('yes', $('#addons').serializeArray(), addons)
                        data.addons = addons
                        // console.log(data)
                        i++
                        switchHandler(i)
                        setSummary()

                    }
                })
            break;
            case 3: 
            $('.next').off('click')
            $('.next').on('click', function(){
                i++
                switchHandler(i)
            })
            break;
            default:
                // console.log('nothing')
        }
    }

    function setSummary(){
            let name = data.plan === 0 ? "Arcade" : data.plan === 1 ? "Advanced" : "Pro";
            let price = () => {
                switch (name){
                    case 'Arcade': 
                        return `$${data.period === 'Monthly' ? '9/mo' : '90/yr'}`
                    break;
                    case "Advanced": 
                        return `$${data.period === 'Monthly' ? '12/mo' : '120/yr'}`
                    break;
                    case "Pro": 
                        return `$${data.period === 'Monthly' ? '15/mo' : '150/yr'}`
                    break;
                    default:
                    return 'nothing'
                } 
            } ;
            // this.plan = () => `${this.name}(${data.period})`
            let setAddons = () => {
                const sub = $('.summary .sub')
                const values = [
                    {name: "Online Service",
                     price: data.period === "Monthly" ? '$1/mo': "$10/yr"},
                    {name: "Larger Storage",
                     price: data.period === "Monthly" ? '$2/mo': "$20/yr"},
                     {name: "Customizable Profile",
                     price: data.period === "Monthly" ? '$2/mo': "$20/yr"}
                ]
                sub.empty()
                data.addons.forEach(el => {
                    let desc = $("<div></div>")
                    desc.addClass('desc')
                    desc.append(`<span>${values[el].name}</span>`)
                    desc.append(`<h6>${values[el].price}</h6>`)
                    sub.append(desc)
                })
            }

            function setTotal(){
                let plan_price = 0;
                switch (name){
                    case 'Arcade':
                        plan_price = 9
                    break;
                    case 'Advanced':
                        plan_price = 12
                    break;
                    case 'Pro':
                        plan_price = 15
                    break;
                }

                let addon_prices = [1, 2, 2]
                let totalAddonPrice = 0
                data.addons.forEach((el) => {
                    totalAddonPrice += addon_prices[el]
                })

                // console.log(plan_price, totalAddonPrice ,plan_price + totalAddonPrice)

                $('.total h4').html(data.period === 'Monthly' ? `$${plan_price + totalAddonPrice}/mo` : `$${(plan_price + totalAddonPrice) * 10}/yr`)
            }
            



        $('.plan .desc h5').html(`${name}(${data.period})`)
        $('.plan .price h4').html(price())
        setAddons()
        setTotal()
    }


    // Keep the form data
})

