export type Week = {
  id: number;
  title: string;
  range: string;
  theme: string;
  accent: "term" | "amber" | "sky" | "coral";
  topics: string[];
  practice: string;
  deliverable: string;
  commands: string[];
};

export const WEEKS: Week[] = [
  {
    id: 1,
    title: "Git: фундамент инженера",
    range: "Неделя 1",
    theme: "Система контроля версий",
    accent: "term",
    topics: ["git init / clone", "add, commit, status", "история: log, diff", "GitHub: push / pull", "README.md"],
    practice: "Создай репозиторий my-first-repo, сделай 5 осмысленных коммитов с README и запушь на GitHub.",
    deliverable: "Публичный репозиторий на GitHub с чистой историей коммитов",
    commands: ["git init", "git add .", 'git commit -m "init: README"', "git remote add origin <url>", "git push -u origin main"],
  },
  {
    id: 2,
    title: "Ветки, конфликты и Pull Requests",
    range: "Неделя 2",
    theme: "Командная работа в Git",
    accent: "term",
    topics: ["branch / switch", "merge и конфликты", "Pull Request + review", ".gitignore", "git restore, stash"],
    practice: "Создай две ветки, измени одну и ту же строку, смержь, разреши конфликт руками и открой PR.",
    deliverable: "Смерженный PR + .gitignore в репозитории (скриншоты конфликта — в README)",
    commands: ["git switch -c feature/header", "git merge feature/header", "git log --oneline --graph --all", "git stash && git stash pop", "git restore --staged ."],
  },
  {
    id: 3,
    title: "Linux: живём в терминале",
    range: "Неделя 3",
    theme: "ОС серверов №1",
    accent: "sky",
    topics: ["файловая система: cd, ls, cat, find", "права: chmod / chown", "процессы: ps, top, kill", "SSH и ключи", "apt/dnf, systemctl"],
    practice: "Подними Ubuntu (WSL/VPS/VirtualBox), создай пользователя с sudo, зайди по SSH-ключу без пароля.",
    deliverable: "Скрипт настройки сервера setup.sh + скриншот SSH-входа по ключу",
    commands: ["sudo useradd -m -s /bin/bash dev", "ssh-keygen -t ed25519", "ssh-copy-id dev@server", "chmod 600 ~/.ssh/id_ed25519", "systemctl status sshd"],
  },
  {
    id: 4,
    title: "Bash: автоматизируем рутину",
    range: "Неделя 4",
    theme: "Скрипты и планировщики",
    accent: "sky",
    topics: ["переменные, условия, циклы", "пайпы | и перенаправления", "функции и аргументы", "cron: расписания", "grep, sed, xargs"],
    practice: "Напиши backup.sh: архивирует папку, пишет лог, удаляет бэкапы старше 7 дней. Повесь на cron в 03:00.",
    deliverable: "Скрипт на GitHub + строка crontab + лог успешного запуска",
    commands: ['find "$DIR" -name "*.log" -mtime +7 -delete', 'tar -czf "backup-$(date +%F).tar.gz" ./data', "grep -c ERROR /var/log/app.log", "crontab -e  # 0 3 * * * /opt/backup.sh", "set -euo pipefail"],
  },
  {
    id: 5,
    title: "Docker: контейнеры с нуля",
    range: "Неделя 5",
    theme: "«Работает везде» — по-настоящему",
    accent: "amber",
    topics: ["контейнер vs ВМ", "docker run / ps / logs / exec", "Dockerfile: слои и кэш", "образы и Docker Hub", "порты -p, env -e"],
    practice: "Заверни простой Python/Node веб-сервер в образ по своему Dockerfile и опубликуй на Docker Hub.",
    deliverable: "Публичный образ + репозиторий с Dockerfile и README",
    commands: ["docker run -d -p 8080:80 nginx:alpine", "docker build -t myapp:1.0 .", "docker ps -a && docker logs -f myapp", "docker exec -it myapp sh", "docker system prune -af"],
  },
  {
    id: 6,
    title: "Docker Compose и multi-stage",
    range: "Неделя 6",
    theme: "Связки сервисов",
    accent: "amber",
    topics: ["compose.yaml: сервисы", "сети и volumes", "depends_on + healthcheck", "multi-stage сборка", "переменные окружения"],
    practice: "Подними связку app + PostgreSQL + nginx одним docker compose up. Данные БД переживают рестарт.",
    deliverable: "Compose-проект: 3 сервиса, volume для БД, README со скриншотом",
    commands: ["docker compose up -d --build", "docker compose logs -f app", "docker compose exec db psql -U app", "docker compose down -v", "docker build --target builder ."],
  },
  {
    id: 7,
    title: "CI/CD на GitHub Actions",
    range: "Неделя 7",
    theme: "Пайплайны: тест → сборка → публикация",
    accent: "coral",
    topics: ["workflows, jobs, steps", "триггеры on: push/PR", "секреты и environments", "артефакты и кэш", "matrix-тесты"],
    practice: "Пайплайн: линтер → тесты → сборка Docker-образа → push в registry. На PR — только тесты.",
    deliverable: "Зелёный пайплайн во вкладке Actions + бейдж в README",
    commands: ["on: [push, pull_request]", "uses: actions/checkout@v4", "docker/build-push-action@v6", "secrets.DOCKER_TOKEN", "if: github.ref == 'refs/heads/main'"],
  },
  {
    id: 8,
    title: "Ansible + Terraform: IaC",
    range: "Неделя 8",
    theme: "Инфраструктура как код",
    accent: "coral",
    topics: ["ansible: inventory, ad-hoc", "playbook и роли", "идемпотентность", "Terraform: .tf, state", "план/апплай: plan, apply"],
    practice: "Playbook ставит и настраивает nginx на 2 хоста; Terraform описывает те же серверы декларативно.",
    deliverable: "Репозиторий infra/: ansible/ + terraform/ + README. Начинаем mock-собеседования",
    commands: ["ansible all -m ping -i inventory.ini", "ansible-playbook site.yml --check", "terraform init && terraform plan", "terraform apply -auto-approve", "ansible-vault edit secrets.yml"],
  },
  {
    id: 9,
    title: "Kubernetes: база оркестрации",
    range: "Неделя 9",
    theme: "Кластер, поды, деплои",
    accent: "term",
    topics: ["архитектура: control plane / node", "minikube / kind локально", "kubectl: get, describe, logs", "Pod → Deployment → Service", "labels и selectors"],
    practice: "Разверни свой Docker-образ в minikube: Deployment на 3 реплики + Service. Убей под — он воскреснет.",
    deliverable: "Скриншот kubectl get pods + манифесты в репозитории k8s/",
    commands: ["minikube start --cpus=2", "kubectl apply -f deployment.yaml", "kubectl get pods -o wide", "kubectl delete pod <имя>  # сам поднимется", "kubectl port-forward svc/app 8080:80"],
  },
  {
    id: 10,
    title: "Kubernetes: production-слой",
    range: "Неделя 10",
    theme: "Ingress, Helm, пробы",
    accent: "term",
    topics: ["Ingress и TLS", "ConfigMap / Secret", "liveness / readiness probes", "Helm-чарты", "HPA: автоскейлинг"],
    practice: "Упакуй приложение в Helm-чарт, добавь probes и Ingress. Поменяй конфиг без пересборки образа.",
    deliverable: "Свой Helm-чарт (helm install проходит чисто) + скриншот приложения по домену",
    commands: ["helm create myapp && helm lint .", "helm install dev ./myapp -f values.yaml", "kubectl get ingress", "kubectl create secret generic db --from-literal=pass=...", "kubectl autoscale deploy app --min=2 --max=5 --cpu-percent=70"],
  },
  {
    id: 11,
    title: "Мониторинг и логирование",
    range: "Неделя 11",
    theme: "Видеть систему насквозь",
    accent: "amber",
    topics: ["Prometheus: scrape, PromQL", "node_exporter, метрики приложения", "Grafana: дашборды", "алерты и Alertmanager", "Loki + promtail: логи"],
    practice: "Собери стенд: Prometheus собирает метрики приложения, Grafana рисует дашборд, алерт стреляет при 5xx.",
    deliverable: "Дашборд в Grafana (JSON в репозитории) + скриншот сработавшего алерта",
    commands: ['rate(http_requests_total[5m])', "histogram_quantile(0.95, ...)", "curl localhost:9090/metrics", "docker compose up -d prometheus grafana loki", "amtool check-config alert.rules"],
  },
  {
    id: 12,
    title: "Финальный проект + оффер",
    range: "Неделя 12",
    theme: "Сборка портфолио и собеседования",
    accent: "coral",
    topics: ["полный цикл: код → CI → k8s → мониторинг", "README, который продаёт", "резюме под DevOps", "mock-интервью ×3", "тестовые задания"],
    practice: "Доведи финальный проект до демо: пайплайн деплоит в k8s, Grafana показывает метрики. Запиши видео на 3 минуты.",
    deliverable: "Итоговый репозиторий + видео-демо + резюме. Откликаешься на вакансии",
    commands: ["git tag v1.0.0 && git push --tags", "helm upgrade --install prod ./chart", "kubectl rollout status deploy/app", "kubectl logs -l app=api --tail=100", "echo 'ОФФЕР БЛИЗКО 🎯'"],
  },
];

export type Module = {
  id: string;
  icon: string;
  num: string;
  title: string;
  short: string;
  what: string;
  why: string;
  lang: string;
  code: string;
  practice: { title: string; steps: string[] };
  checklist: string[];
  mistakes: string[];
  docs: { label: string; url: string }[];
};

export const MODULES: Module[] = [
  {
    id: "git",
    icon: "branch",
    num: "01",
    title: "Git и GitHub",
    short: "Недели 1–2",
    what: "Git — машина времени для кода: каждое изменение сохранено, любую версию можно вернуть. GitHub — облако, где репозитории живут и где работает команда.",
    why: "Каждый день инженера начинается с git pull и заканчивается git push. Без Git тебя не возьмут никуда — это как умение держать ложку.",
    lang: "bash",
    code: `# базовый цикл работы
git clone git@github.com:you/project.git
cd project && git switch -c fix/typo
# ...правим файлы...
git status                    # что изменилось
git add -p                    # выбираем куски осознанно
git commit -m "fix: опечатка в README"
git push -u origin fix/typo   # и открываем Pull Request

# когда всё сломалось (а оно сломается)
git log --oneline --graph --all
git diff HEAD~1               # что изменил последний коммит
git restore <file>            # отменить изменения в файле`,
    practice: {
      title: "Тренажёр конфликтов",
      steps: [
        "Создай репозиторий conflict-gym, в файле app.conf строку port = 8080",
        "Из ветки main создай ветки feature/a и feature/b",
        "В feature/a поменяй порт на 9090, в feature/b — на 3000 (одну и ту же строку)",
        "Смерджи feature/a в main — ок. Затем feature/b — получи конфликт",
        "Разреши конфликт руками, оставив port = 9090, закоммить мердж",
        "Критерий успеха: git log --graph показывает ромбик мерджа, git status чистый",
      ],
    },
    checklist: [
      "Создаю репозиторий и делаю осмысленные коммиты (не «fix1», «fix2»)",
      "Работаю в ветках и открываю Pull Request",
      "Разрешаю merge-конфликты без паники",
      "Настраиваю .gitignore до первого коммита",
      "Могу объяснить разницу git pull и git pull --rebase",
    ],
    mistakes: [
      "Коммитить node_modules / venv / .env — настраивай .gitignore ДО первого коммита",
      "git push --force в main — можно удалить чужую работу. Ветка — не твоя личная",
      "Коммиты «wip», «asdf» — на собеседовании смотрят историю. Пиши как для коллеги",
    ],
    docs: [
      { label: "git-scm.com/doc — официальная книга Pro Git", url: "https://git-scm.com/doc" },
      { label: "GitHub Skills — интерактивные курсы", url: "https://skills.github.com" },
      { label: "learngitbranching.js.org — визуальный тренажёр веток", url: "https://learngitbranching.js.org" },
    ],
  },
  {
    id: "linux",
    icon: "terminal",
    num: "02",
    title: "Linux и Bash",
    short: "Недели 3–4",
    what: "Linux — операционная система, на которой живёт 96% серверов мира. Bash — её язык: команды, которые автоматизируют всё, что ты делаешь руками больше двух раз.",
    why: "DevOps-инженер не кликает мышкой по серверам — он пишет команды. Скрипт на bash экономит команде часы каждую неделю, и именно за это платят.",
    lang: "bash",
    code: `#!/usr/bin/env bash
set -euo pipefail          # упасть при ошибке — это правильно

SRC="/var/www/html"
DST="/backups/site-$(date +%F).tar.gz"

tar -czf "$DST" "$SRC"
find /backups -name "*.tar.gz" -mtime +7 -delete
echo "$(date) | OK | $DST" >> /var/log/backup.log

# вешаем на cron: crontab -e
# 0 3 * * * /opt/scripts/backup.sh`,
    practice: {
      title: "Скрипт-уборщик",
      steps: [
        "Создай 100 файлов log-001.log … log-100.log в папке test_logs (циклом!)",
        "Напиши clean.sh: принимает путь аргументом, находит *.log старше N дней (N — второй аргумент, по умолчанию 7)",
        "Скрипт пишет в отчёт: сколько файлов удалено, сколько места освобождено (du -sh)",
        "Запусти с set -x и разбери каждую строку вывода",
        "Критерий успеха: скрипт работает с аргументами, без аргументов и при пустой папке (не падает)",
      ],
    },
    checklist: [
      "Свободно перемещаюсь: cd, ls, cat, find, grep",
      "Управляю правами: chmod 755 vs 644 объясню на пальцах",
      "Пишу скрипты с переменными, условиями и циклами",
      "Ставлю задачи в cron и читаю чужие crontab",
      "Понимаю пайпы: ps aux | grep nginx | awk '{print $2}' | xargs kill",
    ],
    mistakes: [
      "Работать под root везде — создай пользователя с sudo, привыкай к порядку",
      "rm -rf $VAR/ при пустом $VAR удалит весь диск. Кавычки: rm -rf \"$VAR/\"",
      "Забыть chmod +x — скрипт есть, а bash: permission denied. Это нормально, все через это проходят",
    ],
    docs: [
      { label: "Linux Journey — бесплатный курс с нуля", url: "https://linuxjourney.com" },
      { label: "Bash Guide (wooledge) — библия bash", url: "https://mywiki.wooledge.org/BashGuide" },
      { label: "explainshell.com — разбирает команду по косточкам", url: "https://explainshell.com" },
    ],
  },
  {
    id: "docker",
    icon: "container",
    num: "03",
    title: "Docker и контейнеры",
    short: "Недели 5–6",
    what: "Контейнер — это приложение вместе со всем окружением в «коробке», которая одинаково работает везде. Docker — инструмент, который эти коробки собирает и запускает.",
    why: "«На моём ноутбуке работало!» — фраза, из-за которой ругались команды 20 лет. Контейнеры закрыли вопрос: образ, прошедший тесты, идентичен на проде. Это ядро работы DevOps.",
    lang: "dockerfile",
    code: `# multi-stage: собираем в одном, запускаем в лёгком
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                     # слой с зависимостями — кэшируется
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1`,
    practice: {
      title: "Связка из трёх сервисов",
      steps: [
        "Возьми любое простое приложение (Python Flask / Node Express) с чтением из БД",
        "Напиши Dockerfile с multi-stage сборкой — финальный образ меньше 50 МБ",
        "Опиши compose.yaml: app + postgres:16 + nginx как reverse proxy",
        "Данные БД храни в volume: docker compose down -v не должен их убить… проверь наоборот — без -v данные живут",
        "Критерий успеха: docker compose up -d --build поднимает всё одной командой, nginx отдаёт страницу на :80",
      ],
    },
    checklist: [
      "Пишу Dockerfile и понимаю порядок слоёв (дорогое — вниз, частое — вверх)",
      "Запускаю, останавливаю, читаю логи и захожу внутрь контейнера",
      "Собираю multi-service стек через Docker Compose",
      "Отличаю volume от bind mount",
      "Публикую образ в registry с тегом версии, а не только latest",
    ],
    mistakes: [
      "COPY . . до npm install — кэш слоёв ломается от каждого изменения кода",
      "Образ на 1.2 ГБ из ubuntu с node внутри — бери alpine/distroless и multi-stage",
      "Хранить данные внутри контейнера — контейнер удалили, данные пропали. Только volumes",
    ],
    docs: [
      { label: "docs.docker.com — официальная документация", url: "https://docs.docker.com/get-started/" },
      { label: "Play with Docker — песочница в браузере", url: "https://labs.play-with-docker.com" },
      { label: "docker/awesome-compose — примеры compose-файлов", url: "https://github.com/docker/awesome-compose" },
    ],
  },
  {
    id: "cicd",
    icon: "pipeline",
    num: "04",
    title: "CI/CD: GitHub Actions",
    short: "Неделя 7",
    what: "CI — каждый пуш автоматически прогоняет тесты и сборку. CD — успешная сборка сама уезжает на сервер. Пайплайн — это конвейер, где человек нажимает только git push.",
    why: "Ручной деплой — это «оно работало в пятницу» и страх каждой пятницы. Компании платят за то, чтобы релиз был скучным событием: нажал кнопку — через 5 минут новая версия в проде.",
    lang: "yaml",
    code: `name: build-and-deploy
on:
  push: { branches: [main] }
  pull_request: {}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci && npm test

  publish:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKER_USER }}
          password: \${{ secrets.DOCKER_TOKEN }}
      - uses: docker/build-push-action@v6
        with: { push: true, tags: you/app:\${{ github.sha }} }`,
    practice: {
      title: "Конвейер с воротами качества",
      steps: [
        "Возьми проект из недель 5–6 (app в Docker)",
        "Создай .github/workflows/ci.yml: на PR — линтер и тесты, на main — плюс сборка образа",
        "Добавь кэш зависимостей (actions/cache или встроенный cache: npm)",
        "Секреты DOCKER_USER/DOCKER_TOKEN храни в Settings → Secrets, не в коде",
        "Критерий успеха: сломанный PR не мерджится (тесты красные), мерж в main даёт образ с тегом = SHA коммита",
      ],
    },
    checklist: [
      "Пишу workflow: triggers, jobs, steps, needs",
      "Разделяю «проверки на PR» и «деплой на main»",
      "Работаю с секретами и никогда не коммичу пароли",
      "Кэширую зависимости — пайплайн быстрее в 2–3 раза",
      "Читаю логи упавшего шага и чиню, а не перезапускаю на удачу",
    ],
    mistakes: [
      "Секреты в коде и git push — репозиторий могут просканировать за минуты. Только Secrets",
      "Деплой с тега latest — невозможно откатиться и понять, что в проде. Тегируй SHA/версией",
      "Один гигантский job на 200 строк — разбивай на jobs, они идут параллельно и переиспользуются",
    ],
    docs: [
      { label: "GitHub Actions — официальная документация", url: "https://docs.github.com/actions" },
      { label: "Starter workflows — готовые шаблоны", url: "https://github.com/actions/starter-workflows" },
      { label: "Docker Build Push action", url: "https://github.com/docker/build-push-action" },
    ],
  },
  {
    id: "iac",
    icon: "server",
    num: "05",
    title: "Ansible и Terraform",
    short: "Неделя 8",
    what: "Ansible настраивает серверы по сценарию (playbook) без установки агентов. Terraform создаёт саму инфраструктуру — серверы, сети, DNS — из декларативного описания. Вместе: «инфраструктура как код».",
    why: "Нужно 20 одинаковых серверов? Вручную — день работы и 20 разных результатов. Плейбуком — 4 минуты и полная идентичность. Идентичность = предсказуемость = меньше инцидентов.",
    lang: "yaml",
    code: `# ansible/site.yml — настраиваем веб-серверы
- hosts: webservers
  become: true
  tasks:
    - name: nginx установлен и запущен
      ansible.builtin.apt:
        name: nginx
        state: present
      notify: restart nginx

    - name: наш конфиг на месте
      ansible.builtin.copy:
        src: files/nginx.conf
        dest: /etc/nginx/nginx.conf
        mode: "0644"
      notify: restart nginx

  handlers:
    - name: restart nginx
      ansible.builtin.service:
        name: nginx
        state: restarted

# запуск: ansible-playbook -i inventory.ini site.yml --check`,
    practice: {
      title: "Ферма из двух серверов",
      steps: [
        "Подними 2 ВМ (локально Multipass/VirtualBox или бесплатные облачные)",
        "Опиши их в inventory.ini с группой webservers, доступ по SSH-ключу",
        "Playbook: установка nginx, копирование своего index.html, запуск сервиса",
        "Запусти дважды: второй прогон должен показать changed=0 (идемпотентность!)",
        "Критерий успеха: оба сервера отдают твою страницу, --check до запуска показывает будущие изменения",
      ],
    },
    checklist: [
      "Объясняю идемпотентность на примере (запустил 10 раз — результат один)",
      "Пишу плейбуки: задачи, handlers, notify",
      "Работаю с inventory и группами хостов",
      "Проверяю изменения заранее: --check и --diff",
      "Понимаю, где Ansible (конфигурация), а где Terraform (ресурсы)",
    ],
    mistakes: [
      "Таски без имён (name:) — через месяц не понять, что делает плейбук",
      "Запускать сразу без --check на живых серверах — сначала репетиция",
      "Хранить пароли в inventory — используй ansible-vault",
    ],
    docs: [
      { label: "docs.ansible.com — официальная документация", url: "https://docs.ansible.com" },
      { label: "developer.hashicorp.com/terraform — Terraform Learn", url: "https://developer.hashicorp.com/terraform/tutorials" },
      { label: "Ansible Galaxy — готовые роли сообщества", url: "https://galaxy.ansible.com" },
    ],
  },
  {
    id: "k8s",
    icon: "wheel",
    num: "06",
    title: "Kubernetes",
    short: "Недели 9–10",
    what: "Kubernetes (k8s) — «дирижёр» для контейнеров: решает, на каком сервере запустить, перезапустит упавшее, масштабирует под нагрузку и обновляет без простоя.",
    why: "Когда контейнеров десятки и они на разных серверах, вручную ими не управляют. K8s — стандарт индустрии: его знание — самое частое требование в вакансиях DevOps на 200к+.",
    lang: "yaml",
    code: `# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: app }
spec:
  replicas: 3
  selector: { matchLabels: { app: web } }
  template:
    metadata: { labels: { app: web } }
    spec:
      containers:
        - name: web
          image: you/app:1.0.0
          ports: [{ containerPort: 8080 }]
          readinessProbe:
            httpGet: { path: /health, port: 8080 }
          resources:
            requests: { cpu: 100m, memory: 128Mi }
            limits:   { cpu: 300m, memory: 256Mi }
---
apiVersion: v1
kind: Service
metadata: { name: app }
spec:
  selector: { app: web }
  ports: [{ port: 80, targetPort: 8080 }]`,
    practice: {
      title: "Неубиваемое приложение",
      steps: [
        "minikube start (или kind) — локальный кластер из одной ноды",
        "Примени Deployment своего образа на 3 реплики + Service",
        "kubectl delete pod <имя> — убедись, что под пересоздался сам (self-healing)",
        "kubectl scale deploy app --replicas=5 и посмотри, как балансировщик распределяет трафик",
        "Критерий успеха: приложение доступно всё время, пока ты убиваешь поды и масштабируешь",
      ],
    },
    checklist: [
      "Объясняю цепочку Pod → ReplicaSet → Deployment → Service",
      "Уверенно пользуюсь kubectl: apply, get, describe, logs, exec",
      "Настраиваю probes и понимаю, зачем readiness отделяется от liveness",
      "Ставлю приложение через Helm: values.yaml, upgrade, rollback",
      "Могу найти причину CrashLoopBackOff по describe и logs",
    ],
    mistakes: [
      "Без requests/limits контейнер съест всю ноду — всегда указывай ресурсы",
      "Игнорировать статус CrashLoopBackOff — это приложение падает при старте, читай kubectl logs",
      "Править ресурсы в кластере руками (kubectl edit) вместо git — манифесты должны жить в репозитории",
    ],
    docs: [
      { label: "kubernetes.io/ru/docs — документация на русском", url: "https://kubernetes.io/ru/docs/home/" },
      { label: "Killercoda — бесплатные сценарии в браузере", url: "https://killercoda.com/playgrounds/scenario/kubernetes" },
      { label: "helm.sh/docs — официальная документация Helm", url: "https://helm.sh/docs/intro/quickstart/" },
    ],
  },
  {
    id: "monitoring",
    icon: "pulse",
    num: "07",
    title: "Мониторинг: Prometheus + Grafana + Loki",
    short: "Неделя 11",
    what: "Мониторинг отвечает на вопрос «система жива?» до того, как его задаст клиент. Prometheus собирает метрики (числа), Grafana рисует графики и шлёт алерты, Loki хранит логи.",
    why: "Инженер узнаёт о падении не из чата «у нас всё легло», а из алерта за 2 минуты до этого. Умение строить наблюдаемость — то, что отличает junior+ от стажёра.",
    lang: "yaml",
    code: `# prometheus/prometheus.yml
scrape_configs:
  - job_name: app
    metrics_path: /metrics
    static_configs:
      - targets: ['app:8080']

  - job_name: node
    static_configs:
      - targets: ['node-exporter:9100']

# ключевые PromQL-запросы для дашборда:
#   rate(http_requests_total[5m])             — RPS
#   histogram_quantile(0.95, rate(http_duration_seconds_bucket[5m]))
#                                             — p95 latency
#   1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))
#                                             — загрузка CPU

# правило алерта:
groups:
  - name: app
    rules:
      - alert: HighErrorRate
        expr: rate(http_errors_total[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 2m
        labels: { severity: critical }`,
    practice: {
      title: "Дашборд, который спасает ночью",
      steps: [
        "Подними compose-стек: приложение с /metrics + Prometheus + Grafana + node-exporter",
        "В Grafana подключи Prometheus как datasource (http://prometheus:9090)",
        "Построй 4 панели: RPS, p95 latency, ошибки, CPU/память ноды",
        "Настрой алерт HighErrorRate → телеграм/почта через Alertmanager",
        "Критерий успеха: искусственно сломай приложение — алерт пришёл, на дашборде видно когда и что",
      ],
    },
    checklist: [
      "Объясняю pull-модель Prometheus (почему не push)",
      "Пишу PromQL: rate, histogram_quantile, векторные селекторы",
      "Собираю дашборд в Grafana из своих панелей, не только из готовых",
      "Настраиваю алерт с for: и severity — без алерт-шторма",
      "Отличаю метрики от логов и знаю, когда нужен Loki",
    ],
    mistakes: [
      "Алертить на всё подряд — через неделю алерты начнут игнорировать. Алерт = «встань и чини»",
      "Смотреть на средние (avg) — они прячут проблемы. Используй перцентили p95/p99",
      "Дашборд без тайм-рейта: график «запросов» без rate() показывает растущую.counter-сумму, а не нагрузку",
    ],
    docs: [
      { label: "prometheus.io/docs — официальная документация", url: "https://prometheus.io/docs/introduction/overview/" },
      { label: "grafana.com/docs/grafana — документация Grafana", url: "https://grafana.com/docs/grafana/latest/" },
      { label: "Awesome Prometheus alerts — готовые правила", url: "https://awesome-prometheus-alerts.grep.to" },
    ],
  },
  {
    id: "final",
    icon: "rocket",
    num: "08",
    title: "Финальный проект и собеседования",
    short: "Неделя 12",
    what: "Сборка всего в один проект уровня «можно брать в команду»: приложение в k8s, деплой пайплайном, мониторинг с алертами — и умение об этом рассказать на собеседовании.",
    why: "Рекрутер не верит списку технологий в резюме — он смотрит на GitHub. Один законченный проект с README и демо говорит громче, чем 12 сертификатов.",
    lang: "bash",
    code: `# как выглядит финальное демо (3 минуты видео)
1. git push в main
2. GitHub Actions: тесты → сборка образа → тег v1.2.3
3. ArgoCD/скрипт деплоя: helm upgrade --install prod ./chart
4. kubectl rollout status deployment/app   # zero-downtime
5. Grafana: дашборд жив, алерты на месте
6. kubectl rollout undo deployment/app     # откат за 10 секунд`,
    practice: {
      title: "Проект «full-cycle»",
      steps: [
        "Репозиторий: app/ (код), .github/workflows (CI), chart/ (Helm), monitoring/ (дашборды), README.md",
        "README: проблема → архитектура (схема!) → как запустить за 3 команды → что сломал и как починил",
        "Запиши видео-демо 2–3 минуты: пуш → пайплайн → приложение → дашборд → откат",
        "Пройди 3 mock-интервью: теория, практика у терминала, вопросы «а что если…»",
        "Критерий успеха: незнакомый инженер поднимает проект по README без вопросов к тебе",
      ],
    },
    checklist: [
      "Проект поднимается по README тремя командами",
      "CI: тесты и сборка; CD: деплой в k8s с откатом",
      "Мониторинг: дашборд + минимум 2 работающих алерта",
      "Резюме: 3 проекта с ссылками, цифры («ускорил пайплайн в 2 раза»)",
      "Отвечаю на «расскажи про свой проект» 5 минут без пауз",
    ],
    mistakes: [
      "README из двух строк — проект без описания для рекрутера не существует",
      "Бояться вопросов «не знаю» — честно «не знаю, но решал бы так: …» сильнее выдуманного ответа",
      "Откликаться только на «идеальные» вакансии — откликайся на 70% совпадения, остальному научишься",
    ],
    docs: [
      { label: "roadmap.sh/devops — карта навыков индустрии", url: "https://roadmap.sh/devops" },
      { label: "Хабр Карьера — зарплаты и вакансии DevOps", url: "https://career.habr.com" },
      { label: "DevOps Interview Questions (GitHub)", url: "https://github.com/bregman-arie/devops-exercises" },
    ],
  },
];

export type QuizQ = {
  topic: string;
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export const QUIZ: QuizQ[] = [
  {
    topic: "Git",
    q: "Коллега попросил «сохранить изменения в истории проекта». Какая команда делает это правильно?",
    options: ["git save --all", "git commit -m \"описание изменения\"", "git push --save", "git snapshot create"],
    answer: 1,
    explain: "git commit записывает снимок состояния в историю. save и snapshot в Git не существует, а push лишь отправляет уже сделанные коммиты на сервер.",
  },
  {
    topic: "Linux",
    q: "Что делает команда chmod +x deploy.sh?",
    options: [
      "Удаляет файл deploy.sh",
      "Делает файл исполняемым — его можно запустить как ./deploy.sh",
      "Шифрует файл",
      "Копирует файл в /usr/bin",
    ],
    answer: 1,
    explain: "+x добавляет бит исполнения (execute). Без него bash скажет permission denied даже для самого идеального скрипта.",
  },
  {
    topic: "Docker",
    q: "Чем контейнер принципиально отличается от виртуальной машины?",
    options: [
      "Контейнер — это ВМ, но быстрее",
      "Контейнеры делят ядро ОС хоста, а у каждой ВМ — своя полноценная ОС",
      "ВМ работает только в облаке",
      "Отличий нет, это одно и то же",
    ],
    answer: 1,
    explain: "ВМ эмулирует железо и поднимает целую ОС (гигабайты, минуты старта). Контейнер изолирует процесс средствами ядра хоста — мегабайты и секунды.",
  },
  {
    topic: "Docker",
    q: "Зачем в Dockerfile сначала COPY package*.json + npm ci, и только потом COPY . .?",
    options: [
      "Так требует синтаксис Docker",
      "Чтобы слой с зависимостями кэшировался и не переустанавливался при каждом изменении кода",
      "Чтобы npm работал без интернета",
      "Это просто традиция, разницы нет",
    ],
    answer: 1,
    explain: "Слои кэшируются, пока не изменились входные данные. package.json меняется редко — зависимости берутся из кэша, и сборка ускоряется в разы.",
  },
  {
    topic: "CI/CD",
    q: "В пайплайне job publish имеет параметр needs: test. Что это значит?",
    options: [
      "test и publish запускаются параллельно",
      "publish запустится только после успешного завершения test",
      "test запускается только если publish упал",
      "jobs выполняются на одной машине",
    ],
    answer: 1,
    explain: "needs строит граф зависимостей: публикация образа не начнётся, пока тесты не зелёные. Сломанный код физически не доедет до registry.",
  },
  {
    topic: "Ansible",
    q: "Playbook запустили 5 раз подряд. Что покажет второй и последующие прогоны?",
    options: [
      "Ошибку: «уже настроено»",
      "changed=0 — идемпотентность: повторный прогон ничего не меняет",
      "Конфликт файлов",
      "Настройку заново с нуля каждый раз",
    ],
    answer: 1,
    explain: "Идемпотентность — сердце Ansible: задача проверяет текущее состояние и действует, только если оно отличается от желаемого. Запустил 1 или 100 раз — результат один.",
  },
  {
    topic: "Kubernetes",
    q: "Ты выполнил kubectl delete pod web-7d9f. Что произойдёт с приложением?",
    options: [
      "Приложение упадёт до ручного перезапуска",
      "Deployment заметит потерю и автоматически создаст новый под — приложение продолжит работать",
      "Весь кластер перезагрузится",
      "Удалится весь Deployment",
    ],
    answer: 1,
    explain: "Это и есть self-healing: Deployment через ReplicaSet следит, что фактическое число подов совпадает с желаемым. Удаление пода — штатная ситуация.",
  },
  {
    topic: "Мониторинг",
    q: "Prometheus использует pull-модель. Что это значит?",
    options: [
      "Приложение само шлёт метрики в Prometheus",
      "Prometheus сам периодически опрашивает эндпоинты /metrics у целей",
      "Метрики передаются по почте",
      "Метрики хранятся в приложении",
    ],
    answer: 1,
    explain: "Prometheus ходит к целям сам (scrape) по расписанию из конфига. Так он всегда знает, кто жив: нет ответа на scrape — цель down, уже алерт.",
  },
];

export type Flashcard = { topic: string; q: string; a: string };

export const FLASHCARDS: Flashcard[] = [
  {
    topic: "Linux",
    q: "Что такое exit code? Что означает 0 и 1?",
    a: "Код завершения программы: 0 — успех, любое ненулевое (чаще 1) — ошибка. На этом строятся все скрипты: if backup.sh; then ... — ветка then выполняется при exit 0.",
  },
  {
    topic: "Git",
    q: "В чём разница между git merge и git rebase?",
    a: "Merge создаёт коммит слияния и сохраняет историю как было (ромбик в графе). Rebase переписывает твои коммиты поверх целевой ветки — история линейная, но уже запушенные общие ветки ребейзить нельзя.",
  },
  {
    topic: "Docker",
    q: "Чем CMD отличается от ENTRYPOINT в Dockerfile?",
    a: "ENTRYPOINT — базовая команда контейнера (исполняемый файл), CMD — аргументы по умолчанию, которые можно переопределить при docker run. Вместе: ENTRYPOINT [\"python\"], CMD [\"app.py\"].",
  },
  {
    topic: "Linux",
    q: "Что такое reverse proxy и зачем он нужен?",
    a: "Сервер (обычно nginx), который принимает запросы клиентов и передаёт их внутренним приложениям. Даёт TLS, балансировку, статику и скрывает внутреннюю архитектуру от внешнего мира.",
  },
  {
    topic: "Ansible",
    q: "Что такое идемпотентность? Приведи пример.",
    a: "Повторное применение даёт тот же результат, что и первое. Пример: задача «файл /etc/hosts содержит строку X» — если строка есть, ничего не меняется (changed=0), если нет — добавляется. Сколько запусков — один результат.",
  },
  {
    topic: "Kubernetes",
    q: "Зачем нужны liveness и readiness пробы? Чем отличаются?",
    a: "Liveness: «жив ли процесс?» — если нет, под перезапускают (лечим зависания). Readiness: «готов ли принимать трафик?» — если нет, под убирают из Service, но не убивают (например, греет кэш при старте).",
  },
  {
    topic: "CI/CD",
    q: "Что такое blue-green деплой?",
    a: "Две одинаковые среды: blue (текущая) и green (новая версия). Трафик переключается на green одним движением; если что-то не так — мгновенный откат обратно на blue. Минус — нужно вдвое ресурсов.",
  },
  {
    topic: "Мониторинг",
    q: "Чем метрики отличаются от логов и трейсов?",
    a: "Метрики — дешёвые числа во времени (RPS, latency): «что происходит?». Логи — подробные события: «почему?». Трейсы — путь запроса по сервисам: «где именно медленно?». Вместе — три столпа observability.",
  },
  {
    topic: "Общее",
    q: "Что такое «инфраструктура как код» (IaC) и её выгоды?",
    a: "Описание инфраструктуры текстом в git: серверы и настройки воспроизводятся командой, изменения проходят ревью как код, есть история и откат. Инструменты: Terraform (ресурсы), Ansible (конфигурация).",
  },
  {
    topic: "Linux",
    q: "Что такое inode и чем «диск заполнен» при свободном месте?",
    a: "inode — структура с метаданными файла; количество их ограничено при форматировании. Миллион пустых файлов съедят все inode: df -i покажет 100%, хотя df -h свободен. Лечится удалением мелочи и проверкой лимитов.",
  },
];

export type Project = {
  weeks: string;
  title: string;
  desc: string;
  stack: string[];
  done: string[];
};

export const PROJECTS: Project[] = [
  {
    weeks: "Недели 1–2",
    title: "dotfiles + conflict-gym",
    desc: "Репозиторий твоих конфилов с README и решённый учебный merge-конфликт с историей в git log --graph.",
    stack: ["Git", "GitHub", "Markdown"],
    done: ["Чистая история коммитов", "README с «зачем»", "Скриншот разрешения конфликта"],
  },
  {
    weeks: "Недели 3–4",
    title: "backup-bot",
    desc: "Bash-скрипт бэкапов с логами, ротацией старше 7 дней, обработкой ошибок и запуском по cron.",
    stack: ["Bash", "cron", "tar", "find"],
    done: ["set -euo pipefail", "Аргументы и значения по умолчанию", "Лог успешных запусков"],
  },
  {
    weeks: "Недели 5–6",
    title: "compose-стек «всё в одном»",
    desc: "Приложение + PostgreSQL + nginx одной командой docker compose up. Multi-stage образ меньше 50 МБ.",
    stack: ["Docker", "Compose", "nginx", "PostgreSQL"],
    done: ["Volume для данных БД", "Healthcheck'и", "Образ на Docker Hub"],
  },
  {
    weeks: "Недели 7–8",
    title: "pipeline + infra-as-code",
    desc: "GitHub Actions: тесты → образ → publish. Ansible настраивает сервер, Terraform описывает ресурсы.",
    stack: ["GitHub Actions", "Ansible", "Terraform"],
    done: ["Секреты в Secrets", "Зелёный бейдж CI", "changed=0 на втором прогоне"],
  },
  {
    weeks: "Недели 9–10",
    title: "app в Kubernetes + Helm",
    desc: "Deployment с probes и resources, Service, Ingress. Всё упаковано в собственный Helm-чарт с values.yaml.",
    stack: ["Kubernetes", "Helm", "Ingress"],
    done: ["Self-healing демо (delete pod)", "helm upgrade/rollback", "Манифесты в git"],
  },
  {
    weeks: "Недели 11–12",
    title: "финальный full-cycle проект",
    desc: "Пуш в main → пайплайн → деплой в k8s → метрики в Grafana → алерты → откат за 10 секунд. Видео-демо 3 минуты.",
    stack: ["Всё сразу", "Prometheus", "Grafana", "Loki"],
    done: ["README на 3 команды запуска", "Рабочие алерты", "Видео-демо + схема архитектуры"],
  },
];

export const LESSON_ANATOMY = [
  { num: "01", title: "Что это", desc: "Одно-два предложения простыми словами. Без «это когда абстракция поверх парадигмы…»." },
  { num: "02", title: "Зачем нужно", desc: "Реальный use case из работы: где инженер сталкивается с этим каждую неделю." },
  { num: "03", title: "Теория", desc: "Ключевые концепции, команды, синтаксис — 20% времени занятия, строго по делу." },
  { num: "04", title: "Практика", desc: "Пошаговое задание, которое делаешь руками прямо сейчас. 80% времени занятия." },
  { num: "05", title: "Домашка", desc: "2–3 часа самостоятельной работы: закрепление на своём варианте задачи." },
  { num: "06", title: "Чек-лист", desc: "Конкретные «я умею…», по которым видно, что тема закрыта. Без расплывчатого «разобрался»." },
  { num: "07", title: "Следующий шаг", desc: "Куда ведёт эта тема в маршруте к офферу и что будет на следующем занятии." },
];

export const STUCK_STEPS = [
  { num: "1", title: "Локализуй", desc: "Спроси себя: что именно не работает? «Всё сломалось» — не диагноз. Ошибка в терминале — уже половина ответа: читай её снизу вверх." },
  { num: "2", title: "Разрежь задачу", desc: "Разбей на части настолько маленькие, чтобы каждая делалась за 5 минут. Большая задача пугает, маленькая — делается." },
  { num: "3", title: "Найди пару", desc: "Погугли точный текст ошибки (кавычки помогают) + название инструмента. 9 из 10 ошибок новичка уже кем-то решены на Stack Overflow." },
  { num: "4", title: "Вернись к базе", desc: "Если объяснение не заходит — отступи на концепцию назад. Не понятно про слои Docker? Вернись к тому, что такое файловая система." },
  { num: "5", title: "Спроси вслух", desc: "Сформулируй вопрос так, будто объясняешь коллеге: «я хочу X, делаю Y, получаю Z, ожидал W». Половина вопросов решается на этом шаге." },
];

export const RESOURCES = [
  {
    group: "Песочницы — тренируйся без установки",
    items: [
      { label: "Play with Docker", url: "https://labs.play-with-docker.com", note: "терминал с Docker прямо в браузере" },
      { label: "Killercoda", url: "https://killercoda.com", note: "бесплатные сценарии по k8s и Linux" },
      { label: "GitHub Codespaces", url: "https://github.com/features/codespaces", note: "60 часов/мес бесплатной dev-среды" },
    ],
  },
  {
    group: "Официальная документация",
    items: [
      { label: "Git Pro Git (есть на русском)", url: "https://git-scm.com/book/ru/v2", note: "книга, закрывающая Git полностью" },
      { label: "Docker Get Started", url: "https://docs.docker.com/get-started/", note: "официальный курс для новичков" },
      { label: "Kubernetes на русском", url: "https://kubernetes.io/ru/docs/home/", note: "русская версия официальных docs" },
      { label: "GitHub Actions", url: "https://docs.github.com/actions", note: "гайды и справочник по workflow" },
    ],
  },
  {
    group: "Тренажёры и карты",
    items: [
      { label: "Learn Git Branching", url: "https://learngitbranching.js.org", note: "ветки Git на визуальных головоломках" },
      { label: "roadmap.sh/devops", url: "https://roadmap.sh/devops", note: "индустриальная карта навыков" },
      { label: "DevOps Exercises", url: "https://github.com/bregman-arie/devops-exercises", note: "3000+ вопросов для подготовки" },
      { label: "explainshell", url: "https://explainshell.com", note: "разбор bash-команд по частям" },
    ],
  },
];

export const TICKER = [
  "git", "linux", "bash", "ssh", "docker", "docker compose", "github actions", "ci/cd",
  "ansible", "terraform", "kubernetes", "helm", "prometheus", "grafana", "loki", "nginx",
];
