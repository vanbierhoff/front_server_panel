export class SerializerService {

    static serialize<T>(data: T): T {
        return data;
    }

    // Сериализованные данные и значения пишутся в form, которая прокидывается в метод
    static deserialize<F, D>(data: D, form: F): D {

        return data;
    }
}


