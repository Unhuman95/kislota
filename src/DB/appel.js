const API_URL = 'http://10.0.2.2:3000/';

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
        const rawData = [];
        
        const groupedData = groupLessons(rows);
        return groupedData;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
}

const groupLessons = (data) => {
    const result = [];
    const titleMap = new Map();
  
    data.forEach((item) => {
      const { ID_class, title, count, teacher, kid, ID_lesson, day, time, postponed } = item;
  
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
      course.lesson.push({ ID_lesson, day, time, postponed });
    });
  
    titleMap.forEach((value) => result.push(value));
    return result;
};

const addAboniment = async (name, mail, course, comment, discipline, purpose) => {
    try{
        const res = await fetch(`${API_URL}add_aboniment`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, mail, course, comment, discipline, purpose }),
        });

        if(!res.ok) {
            throw new Error(`Ошибка сервера: ${res.status}`);
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
}

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
}

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
}


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
}

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
}

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
}

const addLesson = async(discipline, kid, teacher, time, day) => {
    //const { discipline, kid, teacher, time, day } = lesson;
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
        }

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
};

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
        }

        const data = await res.json();
        console.log('Ответ сервера:', data);
        return data; // Возвращаем данные, если нужно
    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
}

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

    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
    }
}

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

        console.log(`Занятие с ID ${id_lesson} обновлено`);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
}

const updateDay = async(id_lesson, day) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    try {
        const response = await fetch(`${API_URL}update_day`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_lesson,
                day,
                update_date: formattedDate
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        console.log(`Занятие с ID ${id_lesson} обновлено`);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
}

const updateTime = async(id_lesson, time) => {
    const date = new Date();
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    try {
        const response = await fetch(`${API_URL}update_time`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_lesson,
                time: formattedTime,
                update_date: formattedDate
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        console.log(`Занятие с ID ${id_lesson} обновлено`);
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
}

const deleteLesson = async (id) => {
    try {
        const response = await fetch(`${API_URL}delete_lesson/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        console.log(`Занятие с ID ${id} удалено`);
    } catch (error) {
        console.error('Ошибка при удалении:', error);
    }
};

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
}

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
}

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
}

export { API_URL, addLesson, selectClass, selectTraining, selectStudents, 
        selectClassWithID, selectTutorWithID, updateDay, updateTime,
        deleteLesson, selectLesson, addCourse, rescheduleLesson, selectLink,
        selectData, selectUser, addAboniment, selectTutors }