import SQLite from 'react-native-sqlite-storage';
//соединение с базой данных
const db = SQLite.openDatabase(
  {
    name: 'Education.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
    db.transaction(tx => {
      tx.executeSql(
        'PRAGMA foreign_keys = ON;',
        [],
        () => console.log('Foreign keys enabled'),
        (tx, error) => console.error('Error enabling foreign keys', error)
      );
    })
  },
  error => {
    console.log('Error opening database: ', error);
  }
);

//создание тестовых данных
const testData = () => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Tutor(full_name_tutor, password_tutor, login_tutor) VALUES (?, ?, ?)',
      ['Тестовый репетитор', 'password_tutor', 'login_tutor'],
      () => {console.log('Table Tutor inserted successfully')},
      (_, error) => {console.log('Error inserted Tutor: ', error)}
    );
    tx.executeSql(
      'INSERT INTO Methodologist(full_name_methodologist, password_methodologist, login_methodologist) VALUES (?, ?, ?)',
      ['Тестовый методист', 'password_methodologist', 'login_methodologist'],
      () => {console.log('Table Methodologist inserted successfully')},
      (_, error) => {console.log('Error inserted Methodologist: ', error)}
    );
    const traning = ['Подготовка к ЕГЭ', 'Подготовка к ОГЭ', 'Школьная программа']
    for (let i = 0; i < traning.length; i++){
      tx.executeSql(
        'INSERT INTO Direction_Traning(title_traning) VALUES (?)',
        [traning[i]],
        () => {console.log(`Table Direction_Traning ${traning[i]} inserted successfully`)},
        (_, error) => {console.log('Error inserted Direction_Traning: ', error)}
      );
    }
    const discipline = ['Химия', 'Биология', 'Математика', 'Русский язык', 'Обществознание', 'Литература', 'Физика', 'География', 'Информатика', 'Английский язык', 'История']
    for (let i = 0; i < discipline.length; i++){
      tx.executeSql(
        'INSERT INTO Class(title_class) VALUES (?)',
        [discipline[i]],
        () => {console.log(`Table Class ${discipline[i]} inserted successfully`)},
        (_, error) => {console.log('Error inserted Class: ', error)}
      );
    }
    
    for (let i = 0; i < discipline.length; i++){
      tx.executeSql(
        'INSERT INTO Tutor_Class(ID_class, ID_tutor) VALUES (?, ?)',
        [[i+1], 1],
        () => {console.log(`Table Tutor_Class ${i+1} inserted successfully`)},
        (_, error) => {console.log('Error inserted Tutor: ', error)}
      );
    }
  })
}

// Функция для создания таблиц
const createTables = () => { 
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Student(
          ID_student INTEGER NOT NULL,
          full_name_student TEXT NOT NULL CHECK(full_name_student !=''),
          date_registration TEXT NOT NULL CHECK(date_registration !=''),
          school_class INTEGER NOT NULL CHECK(school_class >= 1 AND school_class <= 11),
          Mail_student TEXT NULL,
          phone_number_student INTEGER NULL,
          comment TEXT NULL,
          password_student TEXT NOT NULL CHECK(password_student !=''),
          login_student TEXT NULL CHECK(login_student !=''),
          PRIMARY KEY (ID_student)          
          );`,
        [],
        () => {console.log('Table Student created successfully')}, 
        (_, error) => {console.log('Error creating Student: ', error)}
      );
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS index_student_name ON Student(full_name_student)'
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Tutor(
          ID_tutor INTEGER NOT NULL,
          full_name_tutor TEXT NOT NULL CHECK(full_name_tutor !=''),
          phone_number_tutor INTEGER NULL,
          Mail_tutor TEXT NULL,
          password_tutor TEXT NULL CHECK(password_tutor !=''),
          login_tutor TEXT NULL CHECK(login_tutor !=''),
          PRIMARY KEY (ID_tutor)
          );`,
        [],
        () => {console.log('Table Tutor created successfully')}, 
        (_, error) => {console.log('Error creating Tutor: ', error)}
      );
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS index_tutor_name ON Tutor(full_name_tutor)'
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Tutor_Class(
          ID_tutor_class INTEGER NOT NULL,
          ID_class INTEGER NOT NULL,
          ID_tutor INTEGER NOT NULL,
          PRIMARY KEY (ID_tutor_class),
          FOREIGN KEY (ID_class) REFERENCES Class(ID_class),
          FOREIGN KEY (ID_tutor) REFERENCES Tutor(ID_tutor)
          );`,
        [],
        () => {console.log('Table Tutor_Class created successfully')}, 
        (_, error) => {console.log('Error creating table Tutor_Class: ', error)}
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Training_Course(
          ID_course INTEGER NOT NULL,
          ID_tutor_class INTEGER NOT NULL,
          ID_methodologist INTEGER NOT NULL,
          ID_traning INTEGER NOT NULL,
          date_course_creation TEXT NOT NULL CHECK(date_course_creation !=''),
          date_course_modified TEXT NOT NULL CHECK(date_course_modified !=''),
          number_of_paid_hours INTEGER NOT NULL,
          count_students INTEGER NOT NULL DEFAULT 0, 
          group_course TEXT NOT NULL DEFAULT 'индивидуальный' CHECK(group_course = 'индивидуальный' OR group_course = 'групповой'),
          PRIMARY KEY (ID_course),
          FOREIGN KEY (ID_tutor_class) REFERENCES Tutor_Class(ID_tutor_class),
          FOREIGN KEY (ID_methodologist) REFERENCES Methodologist(ID_methodologist),
          FOREIGN KEY (ID_traning) REFERENCES Traning(ID_traning)
          );`,
        [],
        () => {console.log('Table Training_Course created successfully')}, 
        (_, error) => {console.log('Error creating Training_Course: ', error)}
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Methodologist(
          ID_methodologist INTEGER NOT NULL,
          full_name_methodologist TEXT NOT NULL CHECK(full_name_methodologist !=''),
          phone_number_methodologist INTEGER NULL,
          Mail_methodologist TEXT NULL,
          login_methodologist  TEXT NOT NULL CHECK(login_methodologist !=''),
          password_methodologist TEXT NULL CHECK(password_methodologist !=''),
          PRIMARY KEY (ID_methodologist)
          );`,
        [],
        () => {console.log('Table Methodologist created successfully')}, 
        (_, error) => {console.log('Error creating Methodologist: ', error)}
      );
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS index_methodologist_name ON Methodologist(full_name_methodologist)'
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Lesson(
          ID_lesson INTEGER NOT NULL,
          ID_course INTEGER NOT NULL,
          day_week INTEGER NOT NULL CHECK(day_week < 7),
          start_time TEXT NOT NULL CHECK(start_time !=''),
          date_updation_lesson TEXT NOT NULL CHECK(date_updation_lesson !=''),
          PRIMARY KEY (ID_lesson),
          FOREIGN KEY (ID_course) REFERENCES Course(ID_course)
          );`,
        [],
        () => {console.log('Table Lesson created successfully')}, 
        (_, error) => {console.log('Error creating Lesson: ', error)}
      );
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS index_day_week ON Lesson(day_week)'
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Direction_Traning(
          ID_traning INTEGER NOT NULL,
          title_traning TEXT NOT NULL,
          PRIMARY KEY (ID_traning)
          );`,
        [],
        () => {console.log('Table Direction_Traning created successfully')}, 
        (_, error) => {console.log('Error creating Direction_Traning: ', error)}
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Class(
          ID_class INTEGER NOT NULL,
          title_class TEXT NOT NULL CHECK(title_class != ''),
          PRIMARY KEY (ID_class)
          );`,
        [],
        () => {console.log('Table Class created successfully')}, 
        (_, error) => {console.log('Error creating Class: ', error)}
      );
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS index_class_title ON Class(title_class)'
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Student_Course(
          ID_course INTEGER NOT NULL,
          ID_student INTEGER NOT NULL,
          PRIMARY KEY (ID_course, ID_student),
          FOREIGN KEY (ID_course) REFERENCES Course(ID_course),
          FOREIGN KEY (ID_student) REFERENCES Student(ID_student)
          );`,
        [],
        () => {console.log('Table Student_Course created successfully')}, 
        (_, error) => {console.log('Error creating table Student_Course: ', error)}
      );
      tx.executeSql(
        `CREATE TRIGGER IF NOT EXISTS trigger_insert_group_course
          AFTER INSERT ON Student_Course
          FOR EACH ROW
          BEGIN
            UPDATE Training_Course
            SET count_students = count_students + 1
            WHERE ID_course = NEW.ID_course;

            -- Устанавливаем значение group_course в зависимости от нового count_students
            UPDATE Training_Course
            SET group_course = (
              SELECT CASE 
                WHEN count_students = 1 THEN 'индивидуальный'
                ELSE 'групповой'
              END
              FROM Training_Course
              WHERE ID_course = NEW.ID_course
            )
            WHERE ID_course = NEW.ID_course;
          END;`
      );

      /*tx.executeSql(
        `CREATE TRIGGER IF NOT EXISTS trigger_delete_group_course
          AFTER DELETE ON Student_Course
          FOR EACH ROW
          BEGIN
            IIF(
              (SELECT COUNT(*) FROM Student_Course WHERE ID_course = OLD.ID_course) IS NULL,

              DELETE FROM Training_Course WHERE ID_course = OLD.ID_course,

              UPDATE Training_Course
              SET count_students = count_students - 1
              WHERE ID_course = NEW.ID_course)

            IIF(
              (SELECT COUNT(*) FROM Student_Course WHERE ID_course = OLD.ID_course) IS NOT NULL,
              UPDATE Training_Course
              SET group_course = IIF(count_students = 1, 'индивидуальный', 'групповой')
              WHERE ID_course = NEW.ID_course); 
          END;`
      );*/

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Task(
          ID_task INTEGER NOT NULL,
          ID_lesson INTEGER NOT NULL,
          description TEXT NOT NULL CHECK(description != ''),
          rating INTEGER NULL CHECK(rating >=2 AND rating <= 5 OR rating IS NULL),
          is_complete INTEGER NOT NULL DEFAULT 0 CHECK(is_complete = 0 OR is_complete = 1),
          deadline TEXT NOT NULL CHECK(deadline != ''),
          date_creation_task TEXT NOT NULL CHECK(date_creation_task !=''),
          date_updation_tomework TEXT NOT NULL CHECK(date_updation_tomework !=''),
          PRIMARY KEY (ID_task),
          FOREIGN KEY (ID_lesson) REFERENCES Lesson(ID_lesson)
          );`,
        [],
        () => {console.log('Table Task created successfully')}, 
        (_, error) => {console.log('Error creating Task: ', error)}
      ); 
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS index_deadline ON Task(deadline)'
      );    
    });
};

const deleteDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS Student;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Tutor;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Tutor_Class;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Training_Course;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Methodologist;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Task;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Direction_Traning;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Class;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Lesson;',
      [],
      () => {console.log('deleted all')}
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS Student_Course;',
      [],
      () => {console.log('deleted all')}
    );
  })
}

const addAboniment = (student) => {
  let { name, mail, course, comment, discipline, purpose } = student;
  const date = new Date();
  const formattedDate = new Date(date).toISOString().split('T')[0];

  let ID_student;
  let ID_course = 0;
  let ID_tutor_class;
  
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Student(full_name_student, date_registration, school_class, Mail_student, comment, password_student, login_student) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, formattedDate, course, mail, comment, 'password_student', 'login_student'],
      (_, res) => {
        ID_student = res.insertId;

        tx.executeSql(
          'SELECT ID_tutor_class FROM Tutor_Class WHERE ID_class = ? AND ID_Tutor = ?', 
          [discipline, 1],
          (_, res) => {
            ID_tutor_class = res.rows.item(0).ID_tutor_class;

            tx.executeSql(
              'SELECT * FROM Training_Course WHERE ID_tutor_class = ? AND ID_traning = ?',
              [ID_tutor_class, purpose],
              (_, res) => {
                if (res.rows.length > 0) {
                  ID_course = res.rows.item(0).ID_course;
                  console.log('Курс существует', ID_course);
                  addStudent_Course(tx, ID_student, ID_course)
                }
                else {
                  tx.executeSql(
                    'INSERT INTO Training_Course(ID_tutor_class, ID_methodologist, ID_traning, date_course_creation, date_course_modified, number_of_paid_hours) VALUES (?, ?, ?, ?, ?, ?)',
                    [ID_tutor_class, 1, purpose, formattedDate, formattedDate, 0],
                    (_, res) => {
                      ID_course = res.insertId;
                      console.log('Course added successfully ', ID_course);
                      addStudent_Course(tx, ID_student, ID_course)
                    },
                    (_, error) => {console.log('Error adding Course: ', error)}
                  );
                };                
              },
              (_, error) => {console.log('No', error)}
            );
            console.log('Student_Course added successfully', res.insertId);
          },
          (_, error) => {
            console.error('Error fetching data:', error);
          }
        );
        console.log('Student added successfully', res.insertId);
      },
      (_, error) => {console.log('Error adding Student: ', error)}
    );
  });
};

const addStudent_Course = (tx, ID_student, ID_course) => {
  console.log(ID_student, ID_course);
  tx.executeSql(
    'INSERT INTO Student_Course(ID_student, ID_course) VALUES (?, ?)',
    [ID_student, ID_course],
    (_, res) => {
      console.log('Student_Course added')
    },
    (_, error) => {console.log('Error adding Student_Course: ', error)}
  );
}

const addCourse = (course) => {
  let { kid, discipline, purpose } = course;
  const date = new Date();
  const formattedDate = new Date(date).toISOString().split('T')[0];
  
  let ID_course = 0;
  
  db.transaction(tx => {
    tx.executeSql(
      'SELECT ID_tutor_class FROM Tutor_Class WHERE ID_class = ? AND ID_Tutor = ?', 
      [discipline, 1],
      (_, res) => {
        ID_tutor_class = res.rows.item(0).ID_tutor_class;
        tx.executeSql(
          'SELECT * FROM Training_Course WHERE ID_tutor_class = ? AND ID_traning = ?',
          [ID_tutor_class, purpose],
          (_, res) => {
            if (res.rows.length > 0) {
              ID_course = res.rows.item(0).ID_course;
              console.log('Курс существует', ID_course);
              addStudent_Course(tx, kid, ID_course);
            }
            else {
              tx.executeSql(
                'INSERT INTO Training_Course(ID_tutor_class, ID_methodologist, ID_traning, date_course_creation, date_course_modified, number_of_paid_hours) VALUES (?, ?, ?, ?, ?, ?)',
                [ID_tutor_class, 1, purpose, formattedDate, formattedDate, 0],
                (_, res) => {
                  ID_course = res.insertId;
                  console.log('Course added successfully ', ID_course);
                  addStudent_Course(tx, kid, ID_course);
                },
                (_, error) => {console.log('Error adding Course: ', error)}
              );
            };                
          },
          (_, error) => {console.log('No', error)}
        );
      });
  });
};

const selectClass = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Class',
        [],
        (_, res) => {
          const rows = res.rows;
          const disciplines = [];

          for (let i = 0; i < rows.length; i++) {
            disciplines.push(rows.item(i)); // Преобразуем результат в массив объектов
          }

          resolve(disciplines);
        },
        (error) => {
          console.error('Ошибка выполнения запроса:', error);
          reject(error);
        }
      )
    })
  })
};

const selectClassWithID = async(kid) =>{
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT 
          Class.ID_class AS ID_class,
          Class.title_class AS title_class
        FROM Class
        JOIN Tutor_Class ON Class.ID_class = Tutor_Class.ID_class
        JOIN Training_Course ON Tutor_Class.ID_tutor_class = Training_Course.ID_tutor_class 
        JOIN Student_Course ON Training_Course.ID_course = Student_Course.ID_course
        WHERE Student_Course.ID_student = ?`,
        [kid],
        (_, res) => {
          const rows = res.rows;
          const disciplines = [];

          for (let i = 0; i < rows.length; i++) {
            disciplines.push(rows.item(i)); // Преобразуем результат в массив объектов
          }

          resolve(disciplines);
        },
        (error) => {
          console.error('Ошибка выполнения запроса:', error);
          reject(error);
        }
      )
    })
  })
}

const selectTutorWithID = async(tutor) =>{
  const {kid, discipline} = tutor
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT 
          Tutor.ID_tutor AS ID_tutor,
          Tutor.full_name_tutor AS full_name_tutor
        FROM Tutor
        JOIN Tutor_Class ON Tutor.ID_tutor = Tutor_Class.ID_tutor
        JOIN Training_Course ON Tutor_Class.ID_tutor_class = Training_Course.ID_tutor_class 
        JOIN Student_Course ON Training_Course.ID_course = Student_Course.ID_course
        WHERE Student_Course.ID_student = ? AND Tutor_Class.ID_class = ?`,
        [kid, discipline],
        (_, res) => {
          const rows = res.rows;
          const teachers = [];

          for (let i = 0; i < rows.length; i++) {
            teachers.push(rows.item(i)); // Преобразуем результат в массив объектов
          }

          resolve(teachers);
        },
        (error) => {
          console.error('Ошибка выполнения запроса:', error);
          reject(error);
        }
      )
    })
  })
}

const selectTraning = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Direction_Traning',
        [],
        (_, res) => {
          const rows = res.rows;
          const purposes = [];

          for (let i = 0; i < rows.length; i++) {
            purposes.push(rows.item(i)); // Преобразуем результат в массив объектов
          }

          resolve(purposes);
        },
        (error) => {
          console.error('Ошибка выполнения запроса:', error);
          reject(error);
        }
      )
    })
  })
}

const selectStudents = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Student',
        [],
        (_, res) => {
          const rows = res.rows;
          const students = [];

          for (let i = 0; i < rows.length; i++) {
            students.push(rows.item(i)); // Преобразуем результат в массив объектов
          }

          resolve(students);
        },
        (error) => {
          console.error('Ошибка выполнения запроса:', error);
          reject(error);
        }
      )
    })
  })
}

const addLesson = (lesson) => {
  let { discipline, kid, teacher, time, day } = lesson;
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    const now = new Date();
    const nowDate = new Date(now).toISOString().split('T')[0];
    let ID_course;
    db.transaction(tx => {
      tx.executeSql(
        `SELECT Training_Course.ID_course AS ID_course
        FROM Training_Course
        JOIN Tutor_Class ON Training_Course.ID_tutor_class = Tutor_Class.ID_tutor_class
        JOIN Student_Course ON Training_Course.ID_course = Student_Course.ID_course
        WHERE Student_Course.ID_student = ? AND Tutor_Class.ID_class = ? AND Tutor_Class.ID_tutor = ?`,
        [kid, discipline, teacher],
        (_, res) => {
          ID_course = res.rows.item(0).ID_course;
          //console.log(ID_course);
          tx.executeSql(
            `INSERT INTO Lesson(ID_course, day_week, start_time, date_updation_lesson) VALUES (?, ?, ?, ?)`,
            [ID_course, day, formattedTime, nowDate],
            (_, res) => {console.log('Lesson added successfully', res.insertId);},
            (_, error) => {console.log('Error adding Lesson: ', error)}
        )
          console.log('Все хорошо');
        },
        (_, error) => {console.log('Error selected Lesson: ', error)}
      );
      
    })
}

const selectLesson = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT
          Class.ID_class AS ID_class,
          Class.title_class AS title, 
          Training_Course.number_of_paid_hours AS count, 
          Tutor.full_name_tutor AS teacher, 
          Student.full_name_student AS kid,
          Lesson.ID_lesson as ID_lesson,
          Lesson.day_week AS day,
          Lesson.start_time AS time
         FROM Training_Course
         JOIN Tutor_Class ON Training_Course.ID_tutor_class = Tutor_Class.ID_tutor_class
         JOIN Class ON Tutor_Class.ID_class = Class.ID_class
         JOIN Tutor ON Tutor_Class.ID_tutor = Tutor.ID_tutor
         JOIN Student_Course ON Training_Course.ID_course = Student_Course.ID_course
         JOIN Student ON Student_Course.ID_student = Student.ID_student
         JOIN Lesson ON Training_Course.ID_course = Lesson.ID_course
         ORDER BY Lesson.day_week ASC
         `,
        [],
        (_, res) => {
          const rows = res.rows;
          const rawData = [];
          for (let i = 0; i < rows.length; i++) {
            rawData.push(rows.item(i)); 
          }

          // Группируем данные по title
          const groupedData = groupLessons(rawData);
          console.log(groupedData);
          resolve(groupedData);
        },
        (_, error) => {
          console.error('Error fetching Lesson:', error);
          reject(error);
        }
      );
    });
  });
}

const groupLessons = (data) => {
  const result = [];
  const titleMap = new Map();

  data.forEach((item) => {
    const { ID_class, title, count, teacher, kid, ID_lesson, day, time } = item;

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
    course.lesson.push({ ID_lesson, day, time });
  });

  // Преобразуем Map обратно в массив
  titleMap.forEach((value) => result.push(value));
  return result;
};

const addTask = (task) => {
    let { discipline, kid, description, date } = task;

    const formattedDate = new Date(date).toISOString().split('T')[0];
    const now = new Date();
    const nowDate = new Date(now).toISOString().split('T')[0];
    let ID_lesson;
    const dayWeek = date.getDay();
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    db.transaction(tx => {
      tx.executeSql(
        `SELECT 
          Lesson.ID_lesson FROM Lesson
        JOIN Student_Course ON Training_Course.ID_course = Student_Course.ID_course
        JOIN Student ON Student_Course.ID_student = Student.ID_student
        JOIN Training_Course ON Lesson.ID_course = Training_Course.ID_course
        JOIN Tutor_Class ON Training_Course.ID_tutor_class = Tutor_Class.ID_tutor_class
        WHERE Lesson.day_week = ? AND Tutor_Class.ID_class = ? AND Student.ID_student = ?`,
        [dayWeek, discipline, kid],
        (_, res) => {
          if (res.rows.length > 0) {
            ID_lesson = res.rows.item(0).ID_lesson;
            console.log(ID_lesson);
            tx.executeSql(
              `INSERT INTO Task(ID_lesson, description, is_complete, deadline, date_creation_task, date_updation_tomework) VALUES (?, ?, ?, ?, ?, ?)`,
              [ID_lesson, description, 0, formattedDate, nowDate, nowDate],
              (_, res) => {
                console.log('Task added successfully', res.insertId);
                resolve(res.insertId);
              },
              (_, error) => {
                console.log('Error adding Task: ', error)
                reject(error);
              }
          )}
          else {
            console.log("No lesson found for the given parameters.");
            reject(new Error("No lesson found"));
          }
        },
        (_, error) => {
          console.error('Error fetching Task:', error);
          reject(error);
        }
      )
    })
}

const selectTask = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT
          Task.ID_lesson AS ID_lesson,
          Task.ID_task AS ID_task, 
          Task.description AS description, 
          Task.rating AS rating, 
          Task.is_complete AS complite, 
          Task.deadline AS date,
          Class.title_class AS discipline, 
          Tutor.full_name_tutor AS teacher, 
          Student.full_name_student AS kid
         FROM Task
         JOIN Lesson ON Task.ID_lesson = Lesson.ID_lesson
         JOIN Training_Course ON Lesson.ID_course = Training_Course.ID_course
         JOIN Tutor_Class ON Training_Course.ID_tutor_class = Tutor_Class.ID_tutor_class
         JOIN Class ON Tutor_Class.ID_class = Class.ID_class
         JOIN Tutor ON Tutor_Class.ID_tutor = Tutor.ID_tutor
         JOIN Student_Course ON Lesson.ID_course = Student_Course.ID_course 
         JOIN Student ON Student_Course.ID_student = Student.ID_student
         ORDER BY Task.deadline ASC
         `,
        [],
        (_, { rows }) => {
          const groupedData = {};
          rows.raw().forEach(row => {
            if (!groupedData[row.date]) {
              groupedData[row.date] = [];
            }
            groupedData[row.date].push(row);
          });

          const result = Object.keys(groupedData).map(date => ({
            date,
            task: groupedData[date]
          }));
          resolve(result);
        },
        (_, error) => {
          console.error('Error fetching data:', error);
          reject(error);
        }
      );
    });
  });
};

const updateTask = (task) => {
  let { ID_task, description, rating, date, ID_lesson } = task;
  const formattedDate = new Date(date).toISOString().split('T')[0];

  const dayWeek = date.getDay();
  let ID_course;
  let newID;
  db.transaction(tx => {
      tx.executeSql(
          `UPDATE Task SET description = ? WHERE ID_task = ?;`,
          [description, ID_task],
          (_, res) => {console.log('description was updating', res);},
          (_, error) => {console.log('Error adding user: ', error)}
      );
      tx.executeSql(
        `UPDATE Task SET rating = ? WHERE ID_task = ?;`,
        [rating, ID_task],
        (_, res) => {console.log('rating was updating', res);},
        (_, error) => {console.log('Error adding user: ', error)}
      );
      tx.executeSql(
        'SELECT ID_course FROM Lesson WHERE ID_lesson = ?',
        [ID_lesson],
        (_, res) => {
          ID_course = res.rows.item(0).ID_course;
          tx.executeSql(
            'SELECT ID_lesson FROM Lesson WHERE ID_course = ? AND day_week = ?',
            [ID_course, dayWeek],
            (_, res) => {
              newID = res.rows.item(0).ID_lesson;
              tx.executeSql(
                `UPDATE Task SET deadline = ? WHERE ID_task = ?;`,
                [formattedDate, ID_task],
                (_, res) => {console.log('date was updating', res);}, 
                (_, error) => {console.log('Error adding user: ', error)}
              );
              tx.executeSql(
                `UPDATE Task SET ID_lesson = ? WHERE ID_task = ?;`,
                [newID, ID_task],
                (_, res) => {console.log('date was updating', res);}, 
                (_, error) => {console.log('Error adding user: ', error)}
              );
            }
          );
        },
        (_, error) => {console.log('Error finding ID_course: ', error)}
      )
        
  })
}

const updateTime = (id_lesson, time) => {
  const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
  const date = new Date();
  const formattedDate = new Date(date).toISOString().split('T')[0];
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Lesson SET start_time = ? WHERE ID_lesson = ?',
      [formattedTime, id_lesson],
      (_, res) => {console.log('updating lesson')},
      (_, error) => {console.log('no updating', error)}
    );
    tx.executeSql(
      'UPDATE Lesson SET date_updation_lesson = ? WHERE ID_lesson = ?',
      [formattedDate, id_lesson],
      (_, res) => {console.log('updating lesson')},
      (_, error) => {console.log('no updating', error)}
    );
  })
}

const updateDay = (id_lesson, day) => {
  const date = new Date();
  const formattedDate = new Date(date).toISOString().split('T')[0];
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Lesson SET day_week = ? WHERE ID_lesson = ?',
      [day, id_lesson],
      (_, res) => {console.log('updating lesson')},
      (_, error) => {console.log('no updating')}
    );
    tx.executeSql(
      'UPDATE Lesson SET date_updation_lesson = ? WHERE ID_lesson = ?',
      [formattedDate, id_lesson],
      (_, res) => {console.log('updating lesson')},
      (_, error) => {console.log('no updating')}
    );
  })
}

const deleteLesson = (id_lesson) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Lesson WHERE ID_lesson = ?',
      [id_lesson],
      () => {console.log('task was deleted');},
      (_, error) => {console.log('Error delete task: ', error)}
    )
  })
}

const isComplete = (task) => {
  const { ID_task, value } = task;
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE Task SET is_complete = ? WHERE ID_task = ?;`,
          [value, ID_task],
          (_, res) => {console.log('description was updating', res);},
          (_, error) => {console.log('Error adding user: ', error)}
    );
  }
  )
}

const deleteTask = (task) => {
  let {ID_task} = task;
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Task WHERE ID_task = ?',
      [ID_task],
      () => {console.log('task was deleted');},
      (_, error) => {console.log('Error delete task: ', error)}
    )
  })
}

const selectAll = () => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM Student`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Task`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Tutor`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Tutor_Class`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Training_Course`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Methodologist`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Direction_Traning`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Lesson`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Class`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
    tx.executeSql(
      `SELECT * FROM Student_Course`, // Ваш SELECT-запрос
      [],
      (_, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i)); // Выводим каждую строку в консоль
        }
      },
      (_, error) => {
        console.error('Ошибка при выполнении SELECT:', error);
      }
    );
  });
}

export { db, createTables, addTask, selectTask, updateTask, 
        deleteTask, addAboniment, deleteDB, addCourse,
        testData, selectClass, selectTraning, selectStudents, 
        selectClassWithID, selectTutorWithID, addLesson, selectLesson,
        selectAll, isComplete, updateTime, updateDay, deleteLesson};

