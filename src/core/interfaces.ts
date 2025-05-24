// Определения интерфейсов для Mode-Manager

/**
 * Интерфейс для описания режима (Mode).
 */
export interface IMode {
    slug: string; // Уникальный идентификатор режима
    name: string; // Отображаемое имя режима
    description?: string; // Описание режима
    // Другие свойства, специфичные для режима, могут быть добавлены здесь
}

/**
 * Интерфейс для менеджера режимов.
 * Отвечает за загрузку, управление и переключение режимов.
 */
export interface IModeManager {
    /**
     * Загружает доступные режимы.
     * @returns Promise<IMode[]> Список загруженных режимов.
     */
    loadModes(): Promise<IMode[]>;

    /**
     * Получает список всех доступных режимов.
     * @returns IMode[] Список режимов.
     */
    getModes(): IMode[];

    /**
     * Получает режим по его slug.
     * @param slug - Уникальный идентификатор режима.
     * @returns IMode | undefined - Найденный режим или undefined.
     */
    getModeBySlug(slug: string): IMode | undefined;

    /**
     * Устанавливает активный режим.
     * @param slug - Уникальный идентификатор режима для активации.
     * @returns Promise<void>
     */
    setActiveMode(slug: string): Promise<void>;

    /**
     * Получает текущий активный режим.
     * @returns IMode | undefined - Текущий активный режим или undefined.
     */
    getActiveMode(): IMode | undefined;
}

/**
 * Интерфейс для команды, управляемой Mode-Manager.
 */
export interface IManagedCommand {
    id: string; // Уникальный идентификатор команды
    name: string; // Имя команды для отображения
    description?: string; // Описание команды
    // Метод для выполнения команды
    execute(...args: any[]): Promise<any>;
}