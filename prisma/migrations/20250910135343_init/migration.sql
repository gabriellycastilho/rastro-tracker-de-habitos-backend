/*
  Warnings:

  - Added the required column `frequencia` to the `Habito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Habito" ADD COLUMN     "categoriaId" INTEGER,
ADD COLUMN     "frequencia" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."RegistroHabito" (
    "id" SERIAL NOT NULL,
    "habitoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RegistroHabito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CategoriaHabito" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "CategoriaHabito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Meta" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "habitoId" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Estatistica" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "habitosConcluidos" INTEGER NOT NULL,
    "totalHabitos" INTEGER NOT NULL,

    CONSTRAINT "Estatistica_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Habito" ADD CONSTRAINT "Habito_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."CategoriaHabito"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegistroHabito" ADD CONSTRAINT "RegistroHabito_habitoId_fkey" FOREIGN KEY ("habitoId") REFERENCES "public"."Habito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegistroHabito" ADD CONSTRAINT "RegistroHabito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoriaHabito" ADD CONSTRAINT "CategoriaHabito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Meta" ADD CONSTRAINT "Meta_habitoId_fkey" FOREIGN KEY ("habitoId") REFERENCES "public"."Habito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Meta" ADD CONSTRAINT "Meta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Estatistica" ADD CONSTRAINT "Estatistica_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
