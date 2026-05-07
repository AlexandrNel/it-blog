// seed.ts
import { Role } from './generated/prisma/client';
import {prisma} from './src/shared/lib/prisma'
import * as bcrypt from 'bcrypt';



async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  // Создаем админа
  const adminPassword = await bcrypt.hash('admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      displayName: 'Администратор',
      password: adminPassword,
      role: Role.ADMIN,
      emailVerifiedAt: new Date(),
      profile: {
        create: {
          bio: 'Администратор системы',
          location: 'Москва',
        },
      },
    },
  });
  console.log('✅ Администратор создан:', admin.email);

  // Создаем категории
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { key: 'technology' },
      update: {},
      create: {
        key: 'technology',
        value: 'Технологии',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
    prisma.category.upsert({
      where: { key: 'science' },
      update: {},
      create: {
        key: 'science',
        value: 'Наука',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
    prisma.category.upsert({
      where: { key: 'sports' },
      update: {},
      create: {
        key: 'sports',
        value: 'Спорт',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
    prisma.category.upsert({
      where: { key: 'culture' },
      update: {},
      create: {
        key: 'culture',
        value: 'Культура',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
  ]);
  console.log('✅ Создано категорий:', categories.length);

  // Создаем теги
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { key: 'javascript' },
      update: {},
      create: {
        key: 'javascript',
        name: 'JavaScript',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
    prisma.tag.upsert({
      where: { key: 'python' },
      update: {},
      create: {
        key: 'python',
        name: 'Python',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
    prisma.tag.upsert({
      where: { key: 'ai' },
      update: {},
      create: {
        key: 'ai',
        name: 'Искусственный интеллект',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
    prisma.tag.upsert({
      where: { key: 'blockchain' },
      update: {},
      create: {
        key: 'blockchain',
        name: 'Блокчейн',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
    prisma.tag.upsert({
      where: { key: 'design' },
      update: {},
      create: {
        key: 'design',
        name: 'Дизайн',
        availableFor: [Role.USER, Role.MODERATOR, Role.ADMIN],
      },
    }),
  ]);
  console.log('✅ Создано тегов:', tags.length);

  console.log('🎉 База данных успешно заполнена!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });