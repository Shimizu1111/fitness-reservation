set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.can_access_fitness_user(user_id uuid, target_id uuid, target_role user_role)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    RETURN (
        -- オーナー: 全データにアクセス可能
        (SELECT role FROM public.fitness_reservation_users WHERE id = user_id) = 'オーナー'
        
        -- トレーナー: 自分のデータと全顧客データにアクセス可能
        OR (user_id = target_id AND target_role = 'トレーナー')
        OR (target_role = '顧客' AND (SELECT role FROM public.fitness_reservation_users WHERE id = user_id) = 'トレーナー')
        
        -- 顧客: 自分のデータにのみアクセス可能
        OR (user_id = target_id AND target_role = '顧客')
    );
END;
$function$
;


