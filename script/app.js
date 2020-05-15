window.onload = function() {


};

domain = "http://95.213.140.10/yelm/admin/api/api.php";
platform = "yelm.io"
categoty_change = ""

function get_categories(platform) {
    $.ajax({
        type: "GET",
        url: domain,
        data: "get_categories=true&platform=" + platform,
        success: function(msg) {
            categories = msg
            categories_block = '<div class="catalog_item"> <span class="catalog_subtitle">Название</span> <span class="catalog_subtitle">Товары</span> <span class="catalog_subtitle">Состояние</span> <span class="catalog_subtitle smart_actions_title">Действия</span> </div>'
            console.log(categories)
            for (var i = 0; i < categories.length; i++) {
                category = categories[i].item
                id = category.ID
                count = categories[i].item_count
                status = category.Status
                color = ''
                text = ''


                switch (status) {
                    case 'draft':
                        color = 'orange'
                        text = 'Черновик'
                        break
                    case 'rotation':
                        color = 'green'
                        text = 'В Ротации'
                        break
                    case 'stoped':
                        color = 'red'
                        text = 'Отключен'
                        break
                    default:
                        break

                }

                categories_block += '<div class="catalog_item"> <span class="catalog_subtitle_inside">' + category.Name + '</span> <span class="catalog_subtitle_inside">' + count + ' шт.</span> <span class="catalog_subtitle_inside ' + color + '">' + text + '</span> <div class="smart_actions smart_actions_title"> <a href="#change-popup" onclick="change_category(`' + id + '`, `' + category.Name + '`, `' + status + '`)" class="open-popup-link blue"><i class="fas fa-edit"></i></a> <a href="#" class="red"><i class="fas fa-trash"></i></a> </div> </div>'

            }

            $(".catalog")[0].innerHTML = categories_block;
            maginific()
        }
    });
}



function change_category(id, name, type) {
    $(".change_category_name")[0].value = name



    switch (type) {
        case 'draft':
            $(".change_category_type")[0].value = 3
            break
        case 'rotation':
            $(".change_category_type")[0].value = 1
            break
        case 'stoped':
            $(".change_category_type")[0].value = 2
            break
        default:
            break

    }

    categoty_change = id
}