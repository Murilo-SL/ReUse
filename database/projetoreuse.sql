-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09/06/2026 às 16:06
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projetoreuse`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_name` varchar(100) DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(32) DEFAULT NULL,
  `complement` varchar(128) DEFAULT NULL,
  `neighborhood` varchar(128) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `state` varchar(32) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `address_name`, `label`, `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `zip_code`, `phone`, `is_primary`, `created_at`, `updated_at`) VALUES
(3, 5, 'Casa Ganeko', NULL, 'Rua Manuel Gadelha', '', 'casa', 'Barra do Ceará', 'Fortaleza', 'CE', '60332-770', '(16) 19191-9117', 1, '2026-06-07 13:23:44', '2026-06-07 13:23:44');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `card_holder` varchar(255) NOT NULL,
  `card_last_digits` varchar(4) NOT NULL,
  `card_brand` varchar(50) DEFAULT NULL,
  `expiry_date` varchar(10) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `cards`
--

INSERT INTO `cards` (`id`, `user_id`, `card_holder`, `card_last_digits`, `card_brand`, `expiry_date`, `is_primary`, `created_at`) VALUES
(4, 5, 'Henrique Ganeko', '5654', 'visa', '12/32', 1, '2026-06-07 12:35:30');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(9, 10, 1, 1, '2026-06-08 09:08:24', '2026-06-08 09:08:24'),
(10, 5, 1, 1, '2026-06-08 18:12:11', '2026-06-08 18:20:51');

-- --------------------------------------------------------

--
-- Estrutura para tabela `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(14, 5, 1, '2026-06-08 18:20:41');

-- --------------------------------------------------------

--
-- Estrutura para tabela `institutions`
--

CREATE TABLE `institutions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `institution_type` varchar(64) DEFAULT NULL,
  `cnpj` varchar(20) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `causes` text DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `method_type` varchar(32) NOT NULL DEFAULT 'card',
  `provider` varchar(64) DEFAULT NULL,
  `cardholder_name` varchar(128) DEFAULT NULL,
  `card_brand` varchar(64) DEFAULT NULL,
  `last4` varchar(4) DEFAULT NULL,
  `expiry_month` int(11) DEFAULT NULL,
  `expiry_year` int(11) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `condition_status` varchar(50) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'ativo',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `products`
--

INSERT INTO `products` (`id`, `user_id`, `name`, `description`, `price`, `category`, `condition_status`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, 'Camiseta ReUse', 'Camiseta usada em bom estado', 49.90, 'Roupas', 'Bom', '', 'ativo', '2026-06-07 14:25:59', '2026-06-07 14:25:59');

-- --------------------------------------------------------

--
-- Estrutura para tabela `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seller_type` varchar(32) NOT NULL CHECK (`seller_type` in ('efemero','brecho')),
  `shop_name` varchar(255) NOT NULL,
  `cnpj` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT 0.00,
  `total_sales` int(11) DEFAULT 0,
  `response_rate` varchar(16) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `sellers`
--

INSERT INTO `sellers` (`id`, `user_id`, `seller_type`, `shop_name`, `cnpj`, `address`, `rating`, `total_sales`, `response_rate`, `location`, `description`, `created_at`, `updated_at`) VALUES
(1, 7, 'efemero', 'Minha Loja', '', 'av.ribeiro', 0.00, 0, NULL, NULL, NULL, '2026-06-02 14:16:53', '2026-06-02 14:16:53'),
(2, 9, 'brecho', 'EL POLHOS HERMANOS', '42.027.804/0001-24', '2ª Travessa São José da Colina', 0.00, 0, NULL, NULL, NULL, '2026-06-07 20:58:23', '2026-06-07 20:58:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `seller_addresses`
--

CREATE TABLE `seller_addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `seller_addresses`
--

INSERT INTO `seller_addresses` (`id`, `user_id`, `zipcode`, `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `created_at`, `updated_at`) VALUES
(1, 9, '14807-168', 'Rua Exemplo', '123', 'Sala 2', 'Bairro Exemplo', 'Cidade Exemplo', 'SP', '2026-06-08 18:39:00', '2026-06-08 18:58:25');

-- --------------------------------------------------------

--
-- Estrutura para tabela `seller_payment_methods`
--

CREATE TABLE `seller_payment_methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pix` tinyint(1) DEFAULT 0,
  `credit_card` tinyint(1) DEFAULT 0,
  `debit_card` tinyint(1) DEFAULT 0,
  `boleto` tinyint(1) DEFAULT 0,
  `cash` tinyint(1) DEFAULT 0,
  `bank_transfer` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `seller_payment_methods`
--

INSERT INTO `seller_payment_methods` (`id`, `user_id`, `pix`, `credit_card`, `debit_card`, `boleto`, `cash`, `bank_transfer`, `created_at`, `updated_at`) VALUES
(1, 9, 1, 1, 0, 0, 0, 0, '2026-06-08 19:55:17', '2026-06-08 20:12:24');

-- --------------------------------------------------------

--
-- Estrutura para tabela `seller_pickup_locations`
--

CREATE TABLE `seller_pickup_locations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `seller_pickup_locations`
--

INSERT INTO `seller_pickup_locations` (`id`, `user_id`, `name`, `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `zipcode`, `active`, `created_at`, `updated_at`) VALUES
(3, 9, 'Loja ', 'Rua Matheus de Nóbile', '100', 'loja', 'Vila Standard', 'araraquara', 'SP', '14807-168', 0, '2026-06-08 22:55:38', '2026-06-08 23:09:59');

-- --------------------------------------------------------

--
-- Estrutura para tabela `seller_profiles`
--

CREATE TABLE `seller_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `cnpj` varchar(30) DEFAULT NULL,
  `state_registration` varchar(50) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `seller_profiles`
--

INSERT INTO `seller_profiles` (`id`, `user_id`, `store_name`, `cnpj`, `state_registration`, `phone`, `website`, `description`, `created_at`, `updated_at`) VALUES
(1, 5, 'Loja ReUse Atualizada', '12.345.678/0001-90', '123.456.789.012', '(16) 98888-7777', 'www.reuseatualizada.com', 'Descrição atualizada da loja.', '2026-06-07 21:10:17', '2026-06-07 21:10:58'),
(2, 9, ' el polhos hermanos', '12.345.678/0001-90', 'SP', '(16) 99495-1925', 'www.polhoswemanos.com', 'Apenas mais uma loja comum', '2026-06-07 23:23:16', '2026-06-07 23:23:16');

-- --------------------------------------------------------

--
-- Estrutura para tabela `seller_schedules`
--

CREATE TABLE `seller_schedules` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `monday_friday_open` varchar(10) DEFAULT NULL,
  `monday_friday_close` varchar(10) DEFAULT NULL,
  `monday_friday_closed` tinyint(1) DEFAULT 0,
  `saturday_open` varchar(10) DEFAULT NULL,
  `saturday_close` varchar(10) DEFAULT NULL,
  `saturday_closed` tinyint(1) DEFAULT 0,
  `sunday_closed` tinyint(1) DEFAULT 1,
  `holidays_closed` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `seller_schedules`
--

INSERT INTO `seller_schedules` (`id`, `user_id`, `monday_friday_open`, `monday_friday_close`, `monday_friday_closed`, `saturday_open`, `saturday_close`, `saturday_closed`, `sunday_closed`, `holidays_closed`, `created_at`, `updated_at`) VALUES
(1, 9, '09:00', '20:00', 0, '09:00', '12:00', 0, 0, 1, '2026-06-08 19:17:07', '2026-06-08 19:39:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `seller_shipping_methods`
--

CREATE TABLE `seller_shipping_methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pickup` tinyint(1) DEFAULT 0,
  `local_delivery` tinyint(1) DEFAULT 0,
  `correios` tinyint(1) DEFAULT 0,
  `carrier` tinyint(1) DEFAULT 0,
  `free_shipping` tinyint(1) DEFAULT 0,
  `free_shipping_min_value` decimal(10,2) DEFAULT 0.00,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `seller_shipping_methods`
--

INSERT INTO `seller_shipping_methods` (`id`, `user_id`, `pickup`, `local_delivery`, `correios`, `carrier`, `free_shipping`, `free_shipping_min_value`, `created_at`, `updated_at`) VALUES
(1, 9, 1, 0, 1, 1, 1, 199.90, '2026-06-08 20:21:57', '2026-06-08 20:52:58');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_type` varchar(32) NOT NULL CHECK (`user_type` in ('client','seller','institution')),
  `first_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `cpf` varchar(20) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `profile_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `user_type`, `first_name`, `last_name`, `email`, `password_hash`, `phone`, `cpf`, `birth_date`, `created_at`, `updated_at`, `profile_image`) VALUES
(1, 'seller', 'Jose', 'Teste da Silva', 'jose@gmail.com', '123456789', '16 8-9999-9999', '111.111.111-11', '1979-05-30', '2026-06-01 08:38:49', '2026-06-01 08:38:49', NULL),
(2, 'seller', 'eu', NULL, 'murilo.sl006@gmail.com', '@eusouomelhor', '(16) 99794-7914', '', NULL, '2026-06-01 09:04:21', '2026-06-01 09:04:21', NULL),
(3, 'client', 'murilo', 'santos', 'murilo@gmail.com', '@eusouomelhor', '(55) 55555-5555', '5555555555', '2000-08-01', '2026-06-01 09:10:09', '2026-06-01 09:10:09', NULL),
(5, 'client', 'Henrique', 'Ganeko', 'gakenko@gmail.com', '@Ganeko123456', '(16) 19191-9117', '55951236812', '2000-04-01', '2026-06-02 11:20:06', '2026-06-02 11:20:06', 'uploads/perfis/perfil_1780802219078.png'),
(7, 'seller', NULL, NULL, 'loja@gmail.com', '@lojaS123', '(11) 55487-7456', NULL, NULL, '2026-06-02 14:16:53', '2026-06-02 14:16:53', NULL),
(8, 'client', 'murilo', 'Lima', 'murilolima@gmail.com', '%Murilolima5', '(16) 99794-7914', '55751354682', '1998-02-02', '2026-06-02 21:14:44', '2026-06-02 21:14:44', NULL),
(9, 'seller', NULL, NULL, 'elpolhoshermanos@gmail.com', '#PolhosHermanos123456', '(16) 99495-1925', NULL, NULL, '2026-06-07 20:58:23', '2026-06-07 20:58:23', NULL),
(10, 'client', 'Willian', 'Wallace', 'willian@gmail.com', '$Willian123', '(16) 65161-5651', '56895475689', '2006-10-15', '2026-06-08 08:25:02', '2026-06-08 08:25:02', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_item` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Índices de tabela `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Índices de tabela `institutions`
--
ALTER TABLE `institutions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `seller_addresses`
--
ALTER TABLE `seller_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `seller_payment_methods`
--
ALTER TABLE `seller_payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `seller_pickup_locations`
--
ALTER TABLE `seller_pickup_locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `seller_profiles`
--
ALTER TABLE `seller_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `seller_schedules`
--
ALTER TABLE `seller_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `seller_shipping_methods`
--
ALTER TABLE `seller_shipping_methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `institutions`
--
ALTER TABLE `institutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `seller_addresses`
--
ALTER TABLE `seller_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `seller_payment_methods`
--
ALTER TABLE `seller_payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `seller_pickup_locations`
--
ALTER TABLE `seller_pickup_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `seller_profiles`
--
ALTER TABLE `seller_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `seller_schedules`
--
ALTER TABLE `seller_schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `seller_shipping_methods`
--
ALTER TABLE `seller_shipping_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `institutions`
--
ALTER TABLE `institutions`
  ADD CONSTRAINT `institutions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD CONSTRAINT `payment_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `seller_addresses`
--
ALTER TABLE `seller_addresses`
  ADD CONSTRAINT `seller_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `seller_payment_methods`
--
ALTER TABLE `seller_payment_methods`
  ADD CONSTRAINT `seller_payment_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `seller_pickup_locations`
--
ALTER TABLE `seller_pickup_locations`
  ADD CONSTRAINT `seller_pickup_locations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `seller_profiles`
--
ALTER TABLE `seller_profiles`
  ADD CONSTRAINT `seller_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `seller_schedules`
--
ALTER TABLE `seller_schedules`
  ADD CONSTRAINT `seller_schedules_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `seller_shipping_methods`
--
ALTER TABLE `seller_shipping_methods`
  ADD CONSTRAINT `seller_shipping_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
