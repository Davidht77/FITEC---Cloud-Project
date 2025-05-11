package com.example.cloudproject.datascience;

import com.github.javafaker.Faker;

import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVFormat;

public class IngestaData {

    public static void main(String[] args) {
        generateAndInsertData();
    }

    private static void generateAndInsertData() {
        Faker faker = new Faker();
        try (Connection conn = DatabaseConfig.connect()) {
            for (int i = 0; i < 20000; i++) {
                String name = faker.name().firstName();
                String lastName = faker.name().lastName();
                int age = faker.number().numberBetween(18, 65);
                String phone = faker.phoneNumber().phoneNumber();
                String email = faker.internet().emailAddress();
                String password = faker.internet().password();
                String imageUrlKey = faker.internet().image();

                String clientSql = "INSERT INTO client (name, last_name, age, phone, email, password, imagenUrlKey) VALUES (?, ?, ?, ?, ?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(clientSql)) {
                    stmt.setString(1, name);
                    stmt.setString(2, lastName);
                    stmt.setInt(3, age);
                    stmt.setString(4, phone);
                    stmt.setString(5, email);
                    stmt.setString(6, password);
                    stmt.setString(7, imageUrlKey);
                    stmt.executeUpdate();
                }
            }

            for (int i = 0; i < 20000; i++) {
                long clientId = faker.number().randomNumber();
                long planId = faker.number().randomNumber();
                Date date = new Date(System.currentTimeMillis());
                String type = faker.options().option("Tarjeta", "Transferencia");

                String paymentSql = "INSERT INTO payment (id_client, id_plan, date, type) VALUES (?, ?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(paymentSql)) {
                    stmt.setLong(1, clientId);
                    stmt.setLong(2, planId);
                    stmt.setDate(3, date);
                    stmt.setString(4, type);
                    stmt.executeUpdate();
                }
            }

            for (int i = 0; i < 2000; i++) {
                String name = faker.company().name();
                String description = faker.lorem().sentence();
                double price = faker.number().randomDouble(2, 10, 1000);

                String planSql = "INSERT INTO plan (name, description, price) VALUES (?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(planSql)) {
                    stmt.setString(1, name);
                    stmt.setString(2, description);
                    stmt.setDouble(3, price);
                    stmt.executeUpdate();
                }
            }

            saveToCSV("clients.csv");
            saveToCSV("payments.csv");
            saveToCSV("plans.csv");

        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    private static void saveToCSV(String filename) throws IOException {
        FileWriter fileWriter = new FileWriter(filename);
        CSVPrinter csvPrinter = new CSVPrinter(fileWriter, CSVFormat.DEFAULT.withHeader("ID", "Name", "LastName", "Age", "Phone", "Email"));

        List<String[]> data = List.of(
                new String[]{"1", "John", "Doe", "30", "123-456-7890", "john@example.com"},
                new String[]{"2", "Jane", "Doe", "28", "987-654-3210", "jane@example.com"}
        );

        for (String[] record : data) {
            csvPrinter.printRecord((Object[]) record);
        }

        csvPrinter.flush();
        csvPrinter.close();
    }
}