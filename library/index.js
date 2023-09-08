console.log(`Оцениваю свою работу на 200 баллов - все пункты выполнены:
Этап 1: Пользователь не зарегистрирован
- Ограниченная карусель в блоке About
i. Карусель реагирует на нажатие кнопок (кнопки под каруселью и стрелочки слева и справа в мобильной версии) и происходит анимация перелистывания. +15
ii. На экране шириной 1440px доступно 2 других скрытых картинки. При каждом нажатии выезжает следующая, и так до границ справа и слева. +2
iii. Выделенная кнопка под каруселью (имеется ввиду кнопка соответствующая активному слайду и которая имеет коричневый цвет) - неактивная. +2
iv. Если анимация карусели не успела завершиться, при этом нажата была следующая кнопка, то картинка зависает в промежуточном состоянии. +2
v. На экране шириной 768px доступно 4 других скрытых картинки. Меняем разрешение и перезагружаем страницу. Теперь доступных перемещений становится 5. +2
vi. Неактивными становятся не только выделенные кнопки, но и стрелочки на границах карусели. +2

- Слайдер в блоке Favorites
i. "Слайдер" реагирует на нажатие кнопок панели навигации и происходит анимация затухания и проявления. +15
ii. На любой ширине экрана все 4 карточки с книгами одновременно плавно затухают, а затем плавно проявляться следующие. +2
iii. При прерывании следующим нажатием на кнопку выбора поры года анимация не застывает в промежуточном состоянии. Если анимация не была прервана следующим нажатием кнопки, то она отрабатывается до конца. +2
iv. Во время анимаций высота блока Favorites не меняется. +2
v. ❗Панель навигации "слайдера" сделана по технологии "sticky" для разрешений с одним рядом книг (768px и меньше), т.е. опускается вниз вместе со скроллом страницы, прилипая к верхней части экрана, в рамках блока Favorites. +2

- До регистрации
i. Нажатие на кнопку Check the card ни к чему не приводит.

- После регистрации
i. Иконка юзера в хедере отображается в виде силуэта.
ii. В блоке Favorites все кнопки имеют имя Buy, а не Own. +2

Этап 2: Пользователь на этапе регистрации
- Меню авторизации при нажатии на иконку пользователя
i. Нажатие на иконку пользователя в хедере открывает меню, которое оказывается под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2
ii. На разрешении 768px, при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2
iii. То же верно и в обратную сторону, кнопка бургер-меню доступна при открытом меню авторизации. +2
iv. Нажатие на любую область или элемент вне меню приводят к закрытию меню авторизации. +2

- Модальное окно REGISTER
i. Дизайн модального окна соответствует макету. +15
ii. При нажатии на кнопку Register в открытом меню авторизации появляется модальное окно REGISTER, где есть поля First name, Last name, E-mail и Password. +2
iii. При нажатии кнопки Sign Up в блоке Digital Library Cards также появляется модальное окно REGISTER. +2
iv. Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2
v. При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2
vi. В данном случае, ограничения по полям - все поля не пустые. +2
vii. Пароль не короче 8 символов. +2
viii. В поле E-mail валидация типа email. +2

- Окончание регистрации
i. Данные сохраняются в хранилище localStorage, в том числе и пароль, хотя в реальной жизни так делать нельзя. +2
ii. Иконка пользователя меняется на заглавные буквы имени. +2
iii. Отображение страницы приходит в состояние после авторизации (этап 4) +2
iv. Генерируется девятизначный Card Number случайным образом в формате 16-ричного числа. +2

- При наличии регистрации, но будучи не авторизованным
i. Блок Digital Library Cards. Если введенные имя и номер карты совпадают с данными пользователя, то отображается панель с информацией, вместо кнопки Check the card на 10 секунд. +2
ii. Там же после отображения информации, кнопка возвращается в прежнее состояние, а поля в форме сбрасываются. +2

Этап 3: Пользователь на этапе входа в учетную запись после регистрации.
- Модальное окно LOGIN
i. Дизайн модального окна соответствует макету. +15
ii. При нажатии на кнопку Log In появляется модальное окно LOGIN, где есть поля E-mail or readers card и Password. +2
iii. При нажатии кнопки Log In в блоке Digital Library Cards также появляется модальное окно LOGIN. +2
iv. Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2
v. При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2
vi. Для авторизации все поля должны быть не пустыми. +2 (кнопка не активна, пока хоть одно поле пустое)
vii. Пароль должен быть не короче 8 символов. +2

- Блок Favorites
i. Если пользователь еще не вошел в учетную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN. +2

Этап 4: Пользователь после входа в учетную запись
- Меню профиля при нажатии на иконку с инициалами пользователя
i. При наведении курсором на иконку пользователя должно отображаться полное имя пользователя (атрибут title). +2
ii. Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2
iii. На разрешении 768px при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2
iv. То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна. +2
v. Нажатие на любую область или элемент вне меню приводят к закрытию меню профиля. +2
vi. ❗Вместо надписи Profile отображается девятизначный Card Number. Для Card Number можно использовать меньший шрифт чтобы надпись вметилась в контейнер, +2
vii. Нажатие на кнопку My Profile открывает модальное окно MY PROFILE. +2
viii. Нажатие на кнопку Log Out приводит к выходу пользователю из состояния авторизации, возвращаемся к этапу #1. +2

- Модальное окно MY PROFILE
i. Дизайн модального окна соответствует макету. +15
ii. В случае если имя и фамилия слишком длинные и не влазят в блок то должен произойти перенос фамилии на следующую строку.
iii. Счетчик для Visits отображает, сколько раз пользователь проходил процесс авторизации, включая самый первый - регистрацию. +2
iv. Счетчик для Books отображает, сколько у пользователя книг находятся в состоянии Own. Значение варьируется 0-16. +2

v. Рядом с Card Number есть кнопка, нажатие на которую копирует код карты клиента в буфер обмена. +2
vi. Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2
vii. При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2

- Блок Favorites
i. При нажатии на любую кнопку Buy, еще до покупки абонемента, открывается модальное окно BUY A LIBRARY CARD. +2
ii. При нажатии на любую кнопку Buy, после покупки абонемента, меняет вид кнопки на неактивную Own, добавляя единицу к счетчику книг в профиле. (+2) ***!!!ДА, но это происходит независимо авторизован пользователь или нет!!!***
iii. Кроме того после нажатия обновляется не только счетчик, но и название книги должно отобразится в разделе Rented Books. Название формируется по принципу <название книги>, <автор книги>. В случае если название книги слишком длинное или список стал слишком большой список книг в блоке Rented Books становится скроллируемым (по необходимости горизонтально/ вертикально или оба скролла сразу) Тайтл Rented Books скроллироваться не должен (+2) ***!!!ДА, но это происходит независимо авторизован пользователь или нет!!!***

- Модальное окно BUY A LIBRARY CARD
i. ❗Модальное окно нужно сделать шириной 640px. Будет это обрезка по 5px по бокам, или просто уменьшение длины с сохранением сетки - значения не имеет, хотя при правильной сеточной структуре, сделать это будет намного проще. +2
ii. Дизайн модального окна соответствует макету. +15
iii. При нажатии на крестик в углу окна, или на затемнённую область вне этого окна, оно закрывается. +2
iv. Для того, чтобы кнопка Buy была активна, все поля должны быть не пустыми. +2 (кнопка не активна, пока хоть одно поле пустое)
v. Bank card number должен содержать 16 цифр. С пробелами каждые 4 символа или нет - значения не имеет. +2
vi. Expiration code содержит 2 поля с ограничением в 2 цифры. +2
vii. CVC должен содержать 3 цифры. +2
viii. После удачного нажатия на кнопку Buy, окно закрывается, и больше мы к нему не возвращаемся.

- Блок Digital Library Cards
i. При наличии авторизации вместо кнопки Check the Card будут отображаться данные пользователя и бейджи, как на дизайне LibraryCard after login in account. +2`);
