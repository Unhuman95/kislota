import Toast from 'react-native-toast-message';
const API_URL = 'http://10.0.2.2:3000/';

// Пользоватльские настройки
// Информация о пользователе
const selectUser = async(id) => {
    try {
        const res = await fetch(`${API_URL}select_user/${id}`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Обновление данных о пользователе
const updateUser = async(ID_user, full_name, phone_number) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    try {
        const response = await fetch(`${API_URL}update_user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ID_user,
                full_name,
                phone_number,
                update_date: formattedDate
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Данные обновлены!',
            });
        }
        console.log(`Занятие с ID ${id_lesson} обновлено`);

    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
};
//Изменение пароля
const changePassword = async(old_password, new_password, confirm_password, ID_user) => {
    if (new_password !== confirm_password){
        Toast.show({
                type: 'error',
                text1: 'Пароли не совпадают!',
            });
        return;
    }
    try{
        const res = await fetch(`${API_URL}add_aboniment`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ old_password, new_password, ID_user }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Пароль изменен',
            });
        }
    }
    catch (error) {
        console.error('Ошибка при изменении пароля:', error);
}};
// Регистрация ученика
const addAboniment = async (name, mail, course, comment, discipline, purpose, password) => {
    try{
        const res = await fetch(`${API_URL}add_aboniment`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, mail, course, comment, discipline, purpose, rawPassword: password }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Регистрация прошла успешно',
            });
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
// Регистрация репетитора
const addTutor = async (name, mail, discipline, hours, password) => {
    try{
        const res = await fetch(`${API_URL}add_tutor`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, mail, discipline, hours, rawPassword: password }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Репетитор добавлен',
            });
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
// Добавление курса
const addCourse = async(kid, discipline, purpose) => {
    try{
        const res = await fetch(`${API_URL}add_course`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                discipline,
                kid,
                purpose
            }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Курс добавлен',
            });
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
const addClass = async(tutor, discipline) => {
    try{
        const res = await fetch(`${API_URL}add_discipline`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                discipline,
                tutor
            }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Предмет добавлен',
            });
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
// Для добавления курса: спсиок доступных предметов
const selectClass = async () => {
    try {
        const res = await fetch(`${API_URL}classes`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Для добавления курса: список доступных направлений
const selectTraining = async() => {
    try {
        const res = await fetch(`${API_URL}trainings`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Список репетиторов для предмета
const selectTutors = async(discipline) => {
    try {
        const res = await fetch(`${API_URL}tutors/${discipline}`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Изменение репетитора на курсе
const updateTutor = async(ID_course, tutor, ID_class) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    try {
        const response = await fetch(`${API_URL}update_tutor`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ID_course,
                tutor,
                ID_class,
                update_date: formattedDate
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Репетитор успешно заменен',
            });
        }

        console.log(`Занятие с ID ${id_lesson} обновлено`);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
};
// Рсписание
// Отображение расписания
const selectLesson = async(id, role) => {
    try {
        const res = await fetch(`${API_URL}lessons`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, role}),
        });
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        const rows = await res.json();
        
        const groupedData = groupLessons(rows);
        return groupedData;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
const groupLessons = (data) => {
    const result = [];
    const titleMap = new Map();
  
    data.forEach((item) => {
      const { ID_class, title, count, teacher, kid, ID_lesson, day, time, postponed, date_postponed_lesson } = item;
  
      if (!titleMap.has(ID_class)) {
        titleMap.set(ID_class, {
          ID_class,
          title,
          count,
          teacher,
          kid,
          lesson: [],
        });
      }
  
      const course = titleMap.get(ID_class);
      course.lesson.push({ ID_lesson, day, time, postponed, date_postponed_lesson });
    });
  
    titleMap.forEach((value) => result.push(value));
    return result;
};
// Добавление урока в расписание
const addLesson = async(discipline, kid, teacher, time, day) => {
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`; 
    try{
        const res = await fetch(`${API_URL}add_lesson`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                discipline,
                kid,
                teacher,
                time_lesson: formattedTime,
                day_of_week: day
            }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }else {
            Toast.show({
                type: 'success',
                text1: 'Занятие добавлено в расписание',
            });
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
// Для работы с расписанием (Позже в приницпе пригодится): список учеников
const selectStudents = async() => {
    try {
        const res = await fetch(`${API_URL}students`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Для работы с расписанием: список предметов выбранного ученика
const selectClassWithID = async(kid) => {
    try {
        const res = await fetch(`${API_URL}classes/${kid}`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Для работы с расписанием: репетитор выбранного курса (связка предмета и ученика)
const selectTutorWithID = async({ kid, discipline }) => {
    try {
        const res = await fetch(`${API_URL}tutor?kid=${kid}&discipline=${discipline}`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Обновление занятия
const updateLesson = async(id_lesson, day, time, date_postponed) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];

    if (date_postponed != null){
        const parsedDate = new Date(date);
        const formattedDate = parsedDate.toISOString().split('T')[0];
    }
    try {
        const response = await fetch(`${API_URL}update_lesson`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_lesson,
                day,
                time,
                update_date: formattedDate
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }else {
            Toast.show({
                type: 'success',
                text1: 'Занятие обновлено',
            });
        }

        console.log(`Занятие с ID ${id_lesson} обновлено`);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
};
// Удаление занятия из расписания
const deleteLesson = async (id) => {
    try {
        const response = await fetch(`${API_URL}delete_lesson/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Занятие удалено из расписания',
            });
        }

        console.log(`Занятие с ID ${id} удалено`);
    } catch (error) {
        console.error('Ошибка при удалении:', error);
    }
};
// Перенос занятия
const rescheduleLesson = async (id, time, date) => {
    try {
        const parsedTime = new Date(time);
        const formattedTime = `${parsedTime.getHours().toString().padStart(2, '0')}:${parsedTime.getMinutes().toString().padStart(2, '0')}`;

        const parsedDate = new Date(date);
        const formattedDate = parsedDate.toISOString().split('T')[0];

        console.log(JSON.stringify({ id, new_time: formattedTime, new_date: formattedDate }));

        const res = await fetch(`${API_URL}reschedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, new_time: formattedTime, new_date: formattedDate }),
        });

        if (!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }else {
            Toast.show({
                type: 'success',
                text1: 'Занятие перенесено',
            });
        }

        const data = await res.json();
        console.log('Ответ сервера:', data);
        return data; // Возвращаем данные, если нужно
    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
// Изменение перенесенного занятия
const UpdateReschedule = async (id, time, date) => {
    try {
        const parsedDate = new Date(date);
        const formattedDate = parsedDate.toISOString().split('T')[0];

        //console.log(JSON.stringify({ id, new_time: formattedTime, new_date: formattedDate }));

        const res = await fetch(`${API_URL}reschedule_update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, new_time: time, new_date: formattedDate }),
        });

        if (!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }else {
            Toast.show({
                type: 'success',
                text1: 'Перенесенное занятие обновлено',
            });
        }

        const data = await res.json();
        console.log('Ответ сервера:', data);
        return data; // Возвращаем данные, если нужно
    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
// Дополнительня информация о курсе
// Ссылка на занятие
const selectLink = async(id, role) => {
    try {
        const res = await fetch(`${API_URL}link`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, role}),
        });
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Список заметок по курсу
const selectData = async(course) => {
    try {
        const res = await fetch(`${API_URL}data/${course}`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Добавление заметки по курсу
const addLink = async (ID_course, link) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    try {
        const response = await fetch(`${API_URL}add_link`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ID_course,
                link,
                date: formattedDate
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }else {
            Toast.show({
                type: 'success',
                text1: 'Ссылка изменена',
            });
        }

        console.log(`Занятие с ID ${ID_course} обновлено`);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
};
// Добавить заметку
const addNote = async(ID_course, titleData, discription) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    try{
        const res = await fetch(`${API_URL}add_note`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID_course,
                titleData,
                discription,
                date: formattedDate,
            }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }else{
            Toast.show({
                type: 'success',
                text1: 'Заметка создана',
            });
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};
// Изменить заметку
const updateNote = async(ID_note, titleData, discription) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    try {
        const response = await fetch(`${API_URL}update_note`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ID_note,
                titleData,
                discription,
                date: formattedDate
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Заметка изменена',
            });
        }
        console.log(`Занятие с ID ${ID_note} обновлено`);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
};
// Удалить заметку
const deleteNote = async (id) => {
    try {
        const response = await fetch(`${API_URL}delete_note/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }else {
            Toast.show({
                type: 'success',
                text1: 'Заметка удалена',
            });
        }

        console.log(`Занятие с ID ${id} удалено`);
    } catch (error) {
        console.error('Ошибка при удалении:', error);
    }
};
// Чат
// Список контактов
const selectContacts = async(id, role) => {
    try {
        const res = await fetch(`${API_URL}contacts`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, role}),
        });
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
};
// Поиск сообщений
const selectMessages = async(ID_sender, ID_receiver) => {
    try {
        const res = await fetch(`${API_URL}messages?user1=${ID_sender}&user2=${ID_receiver}`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
}
export { API_URL, addLesson, selectClass, selectTraining, selectStudents, 
        selectClassWithID, selectTutorWithID, updateLesson, addLink,
        deleteLesson, selectLesson, addCourse, rescheduleLesson, selectLink,
        selectData, selectUser, addAboniment, selectTutors, addNote,
        updateNote, deleteNote, selectContacts, updateTutor, selectMessages,
        changePassword, updateUser, UpdateReschedule, addTutor, addClass }