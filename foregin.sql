/*удаление ключей перед alter
ALTER TABLE category DROP FOREIGN KEY FK_category_distributive;
ALTER TABLE category DROP FOREIGN KEY category_ibfk_1;
ALTER TABLE contact DROP FOREIGN KEY contact_ibfk_1;
ALTER TABLE distributive DROP FOREIGN KEY distributive_ibfk_1;
ALTER TABLE document DROP FOREIGN KEY document_ibfk_1;
ALTER TABLE faq DROP FOREIGN KEY faq_ibfk_1;
ALTER TABLE permission DROP FOREIGN KEY permission_ibfk_1;
ALTER TABLE permission DROP FOREIGN KEY permission_ibfk_2;
*/

--
-- Ограничения внешнего ключа таблицы `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_category_distributive` FOREIGN KEY (`distributive`) REFERENCES `distributive` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`subsystem`) REFERENCES `subsystem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`subsystem`) REFERENCES `subsystem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `distributive`
--
ALTER TABLE `distributive`
  ADD CONSTRAINT `distributive_ibfk_1` FOREIGN KEY (`subsystem`) REFERENCES `subsystem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `faq`
--
ALTER TABLE `faq`
  ADD CONSTRAINT `faq_ibfk_1` FOREIGN KEY (`subsystem`) REFERENCES `subsystem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `permission`
--
ALTER TABLE `permission`
  ADD CONSTRAINT `permission_ibfk_1` FOREIGN KEY (`subsystem`) REFERENCES `subsystem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
