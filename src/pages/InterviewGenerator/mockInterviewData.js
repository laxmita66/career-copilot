// Each role has two sets (A and B) so the Regenerate button can swap between them.

export const roles = [
  { value: 'frontend',  label: 'Frontend Developer'    },
  { value: 'backend',   label: 'Backend Developer'     },
  { value: 'fullstack', label: 'Full Stack Developer'  },
  { value: 'java',      label: 'Java Developer'        },
  { value: 'python',    label: 'Python Developer'      },
]

export const interviewData = {

  // ─────────────────── FRONTEND ───────────────────────────────────────────────
  frontend: {
    A: {
      technical: [
        { id: 1,  q: 'Explain the difference between `var`, `let`, and `const` in JavaScript.',                          difficulty: 'Easy'   },
        { id: 2,  q: 'What is the Virtual DOM in React and how does it improve performance?',                             difficulty: 'Medium' },
        { id: 3,  q: 'Describe the CSS Box Model and how `box-sizing: border-box` changes it.',                          difficulty: 'Easy'   },
        { id: 4,  q: 'How does React reconciliation work under the hood?',                                                difficulty: 'Hard'   },
        { id: 5,  q: 'What are React hooks? Explain `useState`, `useEffect`, and `useCallback`.',                        difficulty: 'Medium' },
        { id: 6,  q: 'What is the difference between `null`, `undefined`, and `NaN` in JavaScript?',                    difficulty: 'Easy'   },
        { id: 7,  q: 'Explain event delegation and why it is preferred over attaching listeners to every element.',       difficulty: 'Medium' },
        { id: 8,  q: 'How would you optimise the performance of a slow React application?',                              difficulty: 'Hard'   },
        { id: 9,  q: 'What is Cross-Origin Resource Sharing (CORS) and how do you handle it on the frontend?',           difficulty: 'Medium' },
        { id: 10, q: 'Explain the difference between `useMemo` and `useCallback`. When would you use each?',             difficulty: 'Hard'   },
      ],
      hr: [
        { id: 11, q: 'Tell me about yourself and your journey as a frontend developer.'                          },
        { id: 12, q: 'Describe a project you are most proud of and the technical decisions you made.'            },
        { id: 13, q: 'How do you stay up to date with the rapidly changing frontend ecosystem?'                  },
        { id: 14, q: 'Tell me about a time you disagreed with a technical decision. How did you handle it?'      },
        { id: 15, q: 'Where do you see yourself in 3 years, and how does this role align with that vision?'      },
      ],
    },
    B: {
      technical: [
        { id: 1,  q: 'What are Web Workers and when would you use them?',                                                difficulty: 'Hard'   },
        { id: 2,  q: 'Explain CSS specificity and how the cascade resolves style conflicts.',                             difficulty: 'Medium' },
        { id: 3,  q: 'What is code splitting in React and how does `React.lazy` enable it?',                             difficulty: 'Medium' },
        { id: 4,  q: 'How does the browser rendering pipeline work (parsing → layout → paint → composite)?',             difficulty: 'Hard'   },
        { id: 5,  q: 'What is a closure in JavaScript? Provide a practical use case.',                                   difficulty: 'Medium' },
        { id: 6,  q: 'How would you implement dark mode in a React app using CSS variables?',                            difficulty: 'Easy'   },
        { id: 7,  q: 'What is the difference between SSR, SSG, and CSR? When would you choose each?',                   difficulty: 'Hard'   },
        { id: 8,  q: 'Explain the Flux architecture pattern and how Redux implements it.',                                difficulty: 'Medium' },
        { id: 9,  q: 'What are service workers and how do they enable PWA offline support?',                             difficulty: 'Hard'   },
        { id: 10, q: 'How do you write accessible (WCAG-compliant) React components?',                                   difficulty: 'Medium' },
      ],
      hr: [
        { id: 11, q: 'How do you approach collaboration with designers when requirements are unclear?'          },
        { id: 12, q: 'Describe a time you had to learn a new technology under a tight deadline.'               },
        { id: 13, q: 'How do you prioritise tasks when working on multiple features simultaneously?'            },
        { id: 14, q: 'Tell me about the most challenging bug you have ever fixed.'                              },
        { id: 15, q: 'What motivates you to write clean, maintainable code?'                                   },
      ],
    },
  },

  // ─────────────────── BACKEND ────────────────────────────────────────────────
  backend: {
    A: {
      technical: [
        { id: 1,  q: 'What is the difference between REST and GraphQL? When would you choose one over the other?', difficulty: 'Medium' },
        { id: 2,  q: 'Explain the ACID properties of database transactions.',                                       difficulty: 'Medium' },
        { id: 3,  q: 'What is an index in a relational database and how does it affect query performance?',         difficulty: 'Easy'   },
        { id: 4,  q: 'Describe the differences between SQL and NoSQL databases with use cases for each.',           difficulty: 'Medium' },
        { id: 5,  q: 'How would you design a rate-limiting middleware for a REST API?',                             difficulty: 'Hard'   },
        { id: 6,  q: 'What is JWT and how does token-based authentication work?',                                   difficulty: 'Medium' },
        { id: 7,  q: 'Explain the event loop in Node.js and how it handles non-blocking I/O.',                     difficulty: 'Hard'   },
        { id: 8,  q: 'What strategies do you use to prevent SQL injection attacks?',                               difficulty: 'Medium' },
        { id: 9,  q: 'How would you handle database migrations in a zero-downtime deployment?',                    difficulty: 'Hard'   },
        { id: 10, q: 'What is the CAP theorem and what trade-offs does it impose on distributed systems?',          difficulty: 'Hard'   },
      ],
      hr: [
        { id: 11, q: 'Describe the most complex backend system you have designed or contributed to.'           },
        { id: 12, q: 'How do you approach debugging a production issue that is intermittently occurring?'      },
        { id: 13, q: 'Tell me about a time you improved system performance significantly.'                     },
        { id: 14, q: 'How do you ensure code quality in a fast-moving team?'                                   },
        { id: 15, q: 'How do you balance delivering features quickly with writing maintainable code?'          },
      ],
    },
    B: {
      technical: [
        { id: 1,  q: 'What is the N+1 query problem and how do you solve it with eager loading?',                   difficulty: 'Hard'   },
        { id: 2,  q: 'Explain the differences between horizontal and vertical database scaling.',                   difficulty: 'Medium' },
        { id: 3,  q: 'What is a message queue? Compare RabbitMQ and Kafka.',                                       difficulty: 'Hard'   },
        { id: 4,  q: 'How do you implement pagination in a REST API efficiently?',                                 difficulty: 'Easy'   },
        { id: 5,  q: 'What is connection pooling and why is it important?',                                        difficulty: 'Medium' },
        { id: 6,  q: 'Describe the OAuth 2.0 authorisation code flow.',                                           difficulty: 'Hard'   },
        { id: 7,  q: 'What is idempotency and why is it important in API design?',                                 difficulty: 'Medium' },
        { id: 8,  q: 'How would you design a URL shortener system like bit.ly?',                                   difficulty: 'Hard'   },
        { id: 9,  q: 'What are database transactions and when would you use `ROLLBACK`?',                          difficulty: 'Medium' },
        { id: 10, q: 'Explain the difference between synchronous and asynchronous processing. When is async preferred?', difficulty: 'Medium' },
      ],
      hr: [
        { id: 11, q: 'How do you communicate technical constraints to non-technical stakeholders?'              },
        { id: 12, q: 'Describe a situation where you had to refactor legacy code. What was your approach?'      },
        { id: 13, q: 'Tell me about a time when a project did not go as planned. What did you learn?'          },
        { id: 14, q: 'How do you handle disagreements with a senior engineer about architectural decisions?'    },
        { id: 15, q: 'What does a good code review look like to you?'                                          },
      ],
    },
  },

  // ─────────────────── FULLSTACK ──────────────────────────────────────────────
  fullstack: {
    A: {
      technical: [
        { id: 1,  q: 'Explain the request lifecycle from browser to database and back.',                                   difficulty: 'Medium' },
        { id: 2,  q: 'How do you manage state in a full stack application? Compare client-side vs server-side state.',     difficulty: 'Hard'   },
        { id: 3,  q: 'What is server-side rendering and when is it preferable over CSR in Next.js?',                      difficulty: 'Medium' },
        { id: 4,  q: 'How would you implement user authentication across a React frontend and Node.js backend?',           difficulty: 'Hard'   },
        { id: 5,  q: 'What is the difference between optimistic and pessimistic UI updates?',                             difficulty: 'Medium' },
        { id: 6,  q: 'How do you handle API versioning in a full stack application?',                                     difficulty: 'Medium' },
        { id: 7,  q: 'Describe a micro-frontend architecture. What problems does it solve?',                              difficulty: 'Hard'   },
        { id: 8,  q: 'How do you implement real-time features (e.g. notifications) using WebSockets?',                   difficulty: 'Hard'   },
        { id: 9,  q: 'What is the BFF (Backend For Frontend) pattern and when should you use it?',                       difficulty: 'Hard'   },
        { id: 10, q: 'How do you handle file uploads securely across a full stack React/Node app?',                       difficulty: 'Medium' },
      ],
      hr: [
        { id: 11, q: 'How do you decide whether to build a feature on the client or server side?'               },
        { id: 12, q: 'Tell me about a time you owned a feature from design to deployment.'                      },
        { id: 13, q: 'How do you keep both frontend and backend skills sharp simultaneously?'                   },
        { id: 14, q: 'Describe your approach to estimating the effort for a full stack feature.'                },
        { id: 15, q: 'How do you handle a production incident that crosses frontend and backend boundaries?'    },
      ],
    },
    B: {
      technical: [
        { id: 1,  q: 'What is GraphQL subscriptions and how do they compare to REST webhooks?',                           difficulty: 'Hard'   },
        { id: 2,  q: 'How do you prevent XSS and CSRF attacks in a full stack application?',                              difficulty: 'Hard'   },
        { id: 3,  q: 'Explain the strangler fig pattern for migrating a monolith to microservices.',                      difficulty: 'Hard'   },
        { id: 4,  q: 'What is optimistic locking in databases and when do you need it?',                                  difficulty: 'Medium' },
        { id: 5,  q: 'How do you structure a monorepo containing both frontend and backend packages?',                    difficulty: 'Medium' },
        { id: 6,  q: 'What caching strategies would you apply across frontend (browser), CDN, and API layers?',           difficulty: 'Hard'   },
        { id: 7,  q: 'How do you ensure type safety end-to-end between a TypeScript frontend and Node backend?',          difficulty: 'Medium' },
        { id: 8,  q: 'Describe your CI/CD pipeline for a full stack application.',                                       difficulty: 'Medium' },
        { id: 9,  q: 'What is eventual consistency and how do you handle it in UI design?',                              difficulty: 'Hard'   },
        { id: 10, q: 'How do you implement feature flags across frontend and backend?',                                   difficulty: 'Medium' },
      ],
      hr: [
        { id: 11, q: 'Describe a time when you had to context-switch rapidly between frontend and backend tasks.' },
        { id: 12, q: 'How do you decide when to abstract shared logic into a shared library?'                    },
        { id: 13, q: 'Tell me about a performance bottleneck you identified and fixed across the stack.'         },
        { id: 14, q: 'How do you mentor junior developers on both sides of the stack?'                          },
        { id: 15, q: 'What is your approach when inheriting a large, undocumented codebase?'                    },
      ],
    },
  },

  // ─────────────────── JAVA ───────────────────────────────────────────────────
  java: {
    A: {
      technical: [
        { id: 1,  q: 'Explain the four pillars of OOP with examples in Java.',                                          difficulty: 'Easy'   },
        { id: 2,  q: 'What is the difference between an abstract class and an interface in Java 8+?',                   difficulty: 'Medium' },
        { id: 3,  q: 'How does the Java garbage collector work? Describe the generational GC model.',                   difficulty: 'Hard'   },
        { id: 4,  q: 'What is the Java Memory Model and how does it affect multithreaded programming?',                 difficulty: 'Hard'   },
        { id: 5,  q: 'Explain the difference between `HashMap`, `LinkedHashMap`, and `TreeMap`.',                       difficulty: 'Medium' },
        { id: 6,  q: 'What are Java Streams? Write an example that filters and maps a list.',                           difficulty: 'Medium' },
        { id: 7,  q: 'What is Spring Boot? How does auto-configuration work?',                                         difficulty: 'Medium' },
        { id: 8,  q: 'Explain `synchronized`, `volatile`, and `java.util.concurrent` tools.',                          difficulty: 'Hard'   },
        { id: 9,  q: 'What is a deadlock? How do you detect and prevent it in Java?',                                  difficulty: 'Hard'   },
        { id: 10, q: 'What is the difference between checked and unchecked exceptions? When do you use each?',          difficulty: 'Medium' },
      ],
      hr: [
        { id: 11, q: 'Describe the largest Java application you have worked on.'                                },
        { id: 12, q: 'How do you approach debugging a memory leak in a Java production service?'                },
        { id: 13, q: 'Tell me about a time you significantly improved the performance of a Java service.'       },
        { id: 14, q: 'How do you ensure thread safety in shared components without sacrificing performance?'    },
        { id: 15, q: 'What does clean, maintainable Java code look like to you?'                               },
      ],
    },
    B: {
      technical: [
        { id: 1,  q: 'What are design patterns? Explain Singleton, Factory, and Observer with Java examples.',          difficulty: 'Medium' },
        { id: 2,  q: 'Explain the SOLID principles with a Java example for each.',                                     difficulty: 'Hard'   },
        { id: 3,  q: 'What is reflection in Java and what are its risks?',                                             difficulty: 'Hard'   },
        { id: 4,  q: 'How does Spring Dependency Injection work internally?',                                          difficulty: 'Hard'   },
        { id: 5,  q: 'What is the difference between `Callable` and `Runnable`?',                                      difficulty: 'Easy'   },
        { id: 6,  q: 'Explain JPA and the difference between `EAGER` and `LAZY` fetching.',                            difficulty: 'Medium' },
        { id: 7,  q: 'How do you write unit tests with JUnit 5 and Mockito?',                                         difficulty: 'Medium' },
        { id: 8,  q: 'What is the CompletableFuture API and how does it compare to reactive programming?',             difficulty: 'Hard'   },
        { id: 9,  q: 'How does the `equals()` and `hashCode()` contract affect collections?',                         difficulty: 'Medium' },
        { id: 10, q: 'What are Java records and sealed classes introduced in Java 16–17?',                             difficulty: 'Medium' },
      ],
      hr: [
        { id: 11, q: 'How do you keep your Java skills current with each new LTS release?'                     },
        { id: 12, q: 'Describe a complex refactoring you led in a Java codebase.'                               },
        { id: 13, q: 'Tell me about a time you improved CI/CD for a Java microservices project.'               },
        { id: 14, q: 'How do you balance using frameworks vs. writing from scratch?'                            },
        { id: 15, q: 'What is your process when onboarding onto a new Java project?'                           },
      ],
    },
  },

  // ─────────────────── PYTHON ─────────────────────────────────────────────────
  python: {
    A: {
      technical: [
        { id: 1,  q: 'Explain Python\'s GIL (Global Interpreter Lock) and its impact on multithreading.',              difficulty: 'Hard'   },
        { id: 2,  q: 'What is the difference between `@staticmethod`, `@classmethod`, and instance methods?',          difficulty: 'Medium' },
        { id: 3,  q: 'How do Python decorators work? Write a timing decorator from scratch.',                          difficulty: 'Medium' },
        { id: 4,  q: 'What are Python generators and how do they differ from regular functions?',                      difficulty: 'Medium' },
        { id: 5,  q: 'Explain Python\'s memory management and reference counting.',                                    difficulty: 'Hard'   },
        { id: 6,  q: 'What is the difference between `deepcopy` and `copy` in Python?',                               difficulty: 'Easy'   },
        { id: 7,  q: 'How does async/await work in Python? Compare `asyncio` with threading.',                        difficulty: 'Hard'   },
        { id: 8,  q: 'What are context managers? Implement one using both `__enter__`/`__exit__` and `@contextmanager`.', difficulty: 'Medium' },
        { id: 9,  q: 'Explain list comprehensions, generator expressions, and dict comprehensions with examples.',     difficulty: 'Easy'   },
        { id: 10, q: 'What is `*args` and `**kwargs`? How does argument unpacking work in Python?',                   difficulty: 'Easy'   },
      ],
      hr: [
        { id: 11, q: 'What Python projects are you most proud of, and what challenges did you face?'            },
        { id: 12, q: 'How do you approach testing in Python? Which frameworks do you prefer and why?'           },
        { id: 13, q: 'Tell me about a time you optimised a slow Python script or data pipeline.'                },
        { id: 14, q: 'How do you choose between Django, Flask, and FastAPI for a new project?'                 },
        { id: 15, q: 'Where do you see Python development heading in the next few years?'                      },
      ],
    },
    B: {
      technical: [
        { id: 1,  q: 'What are metaclasses in Python and when would you use one?',                                     difficulty: 'Hard'   },
        { id: 2,  q: 'Explain the MRO (Method Resolution Order) and `super()` in multiple inheritance.',              difficulty: 'Hard'   },
        { id: 3,  q: 'How do you manage dependencies and virtual environments in Python projects?',                   difficulty: 'Easy'   },
        { id: 4,  q: 'What is `__slots__` and how does it reduce memory usage?',                                      difficulty: 'Medium' },
        { id: 5,  q: 'How do you write performant data-processing code using NumPy vs. plain Python loops?',          difficulty: 'Medium' },
        { id: 6,  q: 'What is Pydantic and how does it enforce type safety at runtime?',                              difficulty: 'Medium' },
        { id: 7,  q: 'Explain the difference between `multiprocessing` and `concurrent.futures`.',                   difficulty: 'Hard'   },
        { id: 8,  q: 'How does Python\'s `logging` module work? What are best practices for production logging?',    difficulty: 'Medium' },
        { id: 9,  q: 'What are dataclasses in Python 3.7+? How do they compare to `namedtuple`?',                   difficulty: 'Easy'   },
        { id: 10, q: 'How do you profile and identify performance bottlenecks in a Python application?',              difficulty: 'Hard'   },
      ],
      hr: [
        { id: 11, q: 'How do you handle breaking changes when upgrading Python or library versions?'            },
        { id: 12, q: 'Describe the most complex data pipeline you have built in Python.'                        },
        { id: 13, q: 'Tell me about a time you caught a critical bug through code review.'                      },
        { id: 14, q: 'How do you document Python code for a team of varying experience levels?'                 },
        { id: 15, q: 'What is your approach to writing secure Python APIs?'                                     },
      ],
    },
  },
}
